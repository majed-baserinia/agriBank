import { BaranApiParser } from "$/constants";
import type { parseBaranErrorResponse } from "$/utils/error";
import type { BaranError } from "$/utils/schema";
import type { AxiosResponse } from "axios";
import type { z } from "zod";

export type ErrorResult<TRequestSchema extends z.AnyZodObject> =
	| {
			type: "InternalError";
			message: string;
			details: null;
			raw: null;
	  }
	| {
			type: "ClientSideValidationError";
			message: string;
			details: z.inferFlattenedErrors<TRequestSchema>["fieldErrors"];
			raw: null;
	  }
	| {
			type: "ServerSideValidationError";
			message: string;
			details: NonNullable<
				Awaited<ReturnType<typeof parseBaranErrorResponse<TRequestSchema>>>
			>["errors"];
			raw: BaranError<TRequestSchema>;
	  }
	| {
			type: "ApiError";
			message: string;
			details: string;
			raw: BaranError<TRequestSchema>;
	  }
	| {
			type: "UnknownApiError";
			message: string;
			details: string;
			raw: unknown;
	  };

export type ErrorTypes = ErrorResult<any>["type"];

export type SuccessResult<TResponseSchema extends z.ZodTypeAny> = z.infer<TResponseSchema>;
export type StrictResult<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny
> = (
	| { response: null; error: ErrorResult<TRequestSchema> }
	| { response: SuccessResult<TResponseSchema>; error: null }
) & {
	[BaranApiParser]: true;
};

export type RelaxedResult<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny
> = {
	response: SuccessResult<TResponseSchema> | null;
	error: ErrorResult<TRequestSchema> | null;
	[BaranApiParser]: true;
};

export type Result<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny,
	TIsStrict extends boolean = false
> = TIsStrict extends true
	? StrictResult<TRequestSchema, TResponseSchema>
	: RelaxedResult<TRequestSchema, TResponseSchema>;

export type AnyResult = Result<z.AnyZodObject, z.ZodTypeAny>;

export type Request<TRequestSchema extends z.AnyZodObject, TResponseSchema extends z.ZodTypeAny> = (
	params: z.infer<TRequestSchema>
) => Promise<Response<TResponseSchema>>;

export type Response<TResponseSchema extends z.ZodTypeAny> = AxiosResponse<
	SuccessResult<TResponseSchema>
>;

export type ValidationError<TRequestSchema extends z.AnyZodObject> = Extract<
	ErrorResult<TRequestSchema>,
	{ type: "ServerSideValidationError" } | { type: "ClientSideValidationError" }
>["details"];

export type Options<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny,
	TIsStrict extends boolean = false
> = {
	requestSchema: TRequestSchema;
	responseSchema: TResponseSchema;
	params: z.infer<NoInfer<TRequestSchema>>;
	strict?: TIsStrict;
};

export function isBaranClientResult<
	TRequestSchema extends z.AnyZodObject = z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny = z.ZodTypeAny
>(response: unknown): response is Result<TRequestSchema, TResponseSchema> {
	return (
		response !== null &&
		typeof response === "object" &&
		BaranApiParser in response &&
		response[BaranApiParser] === true
	);
}
