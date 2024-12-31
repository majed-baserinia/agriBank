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
