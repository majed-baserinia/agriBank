import type { BaranApiParser } from "$/constants";
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

export type Result<TRequestSchema extends z.AnyZodObject, TResponseSchema extends z.ZodTypeAny> = {
	response: SuccessResult<TResponseSchema> | null;
	error: ErrorResult<TRequestSchema> | null;
	[BaranApiParser]: true;
};

export type Request<TRequestSchema extends z.AnyZodObject, TResponseSchema extends z.ZodTypeAny> = (
	params: z.infer<TRequestSchema>
) => Promise<Response<TResponseSchema>>;

export type Response<TResponseSchema extends z.ZodTypeAny> = AxiosResponse<
	SuccessResult<TResponseSchema>
>;

export type Options<TRequestSchema extends z.AnyZodObject, TResponseSchema extends z.ZodTypeAny> = {
	requestSchema: TRequestSchema;
	responseSchema: TResponseSchema;
	params: z.infer<TRequestSchema>;
};
