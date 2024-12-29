import { BaranApiParser } from "$/constants";
import type { Options, Request, Result, StrictResult } from "$/types";
import { parseBaranErrorResponse } from "$/utils/error";
import { handledRequest } from "$/utils/handled-request";
import type { AxiosResponse } from "axios";
import i18next from "i18next";
import type { z } from "zod";

export async function callApiStrict<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny
>(
	request: Request<TRequestSchema, TResponseSchema>,
	options: Options<TRequestSchema, TResponseSchema>
): Promise<StrictResult<TRequestSchema, TResponseSchema>> {
	try {
		const parsedParams = options.requestSchema.safeParse(options.params);
		if (!parsedParams.success) {
			return {
				error: {
					type: "ClientSideValidationError",
					message: i18next.t("base:validation-error"),
					details: parsedParams.error.flatten()
						.fieldErrors as z.inferFlattenedErrors<TRequestSchema>["fieldErrors"],
					raw: null
				},
				response: null,
				[BaranApiParser]: true
			};
		}

		const response = await handledRequest(request, parsedParams.data);

		if (response.status === 200) {
			return {
				response: options.responseSchema.parse(response.data) as z.infer<TResponseSchema>,
				error: null,
				[BaranApiParser]: true
			};
		}

		return generateErrorResponse(response, options);
	} catch (e) {
		console.error(e);
		return {
			error: {
				type: "InternalError",
				message: i18next.t("base:internal-error"),
				details: null,
				raw: null
			},
			response: null,
			[BaranApiParser]: true
		};
	}
}

export async function callApi<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny
>(
	request: Request<TRequestSchema, TResponseSchema>,
	options: Options<TRequestSchema, TResponseSchema>
): Promise<Result<TRequestSchema, TResponseSchema>> {
	const result = await callApiStrict(request, options);
	return {
		error: result.error ?? null,
		response: result.response ?? null,
		[BaranApiParser]: true
	};
}

async function generateErrorResponse<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny
>(
	response: AxiosResponse<any>,
	options: Options<TRequestSchema, TResponseSchema>
): Promise<StrictResult<TRequestSchema, TResponseSchema>> {
	const standardServerError = await parseBaranErrorResponse(response.data, options.requestSchema);

	if (!standardServerError) {
		return {
			error: {
				type: "UnknownApiError",
				message: i18next.t("base:unknown"),
				details: i18next.t("base:unknown"),
				raw: response.data as unknown
			},
			response: null,
			[BaranApiParser]: true
		};
	}

	if (standardServerError.errors) {
		return {
			error: {
				type: "ServerSideValidationError",
				message: standardServerError.detail,
				details: standardServerError.errors as NonNullable<
					Awaited<ReturnType<typeof parseBaranErrorResponse<TRequestSchema>>>
				>["errors"], // TODO: why do I need this to exist??,
				raw: standardServerError
			},
			response: null,
			[BaranApiParser]: true
		};
	}

	return {
		error: {
			type: "ApiError",
			message: standardServerError.detail,
			details: standardServerError.detail,
			raw: standardServerError
		},
		response: null,
		[BaranApiParser]: true
	};
}
