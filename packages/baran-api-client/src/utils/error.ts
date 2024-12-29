import { BaranApiParser } from "$/constants";
import type { ErrorResult } from "$/types";
import { createBaranErrorSchema } from "$/utils/schema";
import type { z } from "zod";

export async function parseBaranErrorResponse<TRequestSchema extends z.AnyZodObject>(
	response: unknown,
	requestSchema: TRequestSchema
) {
	const errorSchema = createBaranErrorSchema(requestSchema);
	// if there were multiple errors in `loc` this function only return the first one

	const parsedValidationError = await errorSchema.safeParseAsync(response);
	if (!parsedValidationError.success || !parsedValidationError.data.detail) {
		return null;
	}

	if (parsedValidationError.data.errors === undefined) {
		return null;
	}

	return parsedValidationError.data;
}

export function isBaranError<TRequestSchema extends z.AnyZodObject = z.AnyZodObject>(
	error: unknown
): error is ErrorResult<TRequestSchema> {
	return (
		error !== null &&
		typeof error === "object" &&
		"type" in error &&
		"message" in error &&
		"details" in error &&
		BaranApiParser in error &&
		error[BaranApiParser] === true
	);
}
