import type { ValidationError } from "$/types";
import type { FieldPath, FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { z } from "zod";

export function setBaranErrorsToForm<
	TRequestSchema extends z.AnyZodObject,
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues extends FieldValues | undefined = undefined
>(
	data:
		| {
				validationError?: ValidationError<TRequestSchema>;
		  }
		| undefined,
	form: UseFormReturn<TFieldValues, TContext, TTransformedValues>,
	path?: Path<TFieldValues>
) {
	return (
		data?.validationError &&
		Object.entries(data.validationError).forEach(([key, errors]) => {
			if (!errors) {
				return;
			}
			form.setError(((path ? path + "." : "") + key) as FieldPath<TFieldValues>, {
				message: errors[0],
				type: "root.api"
			});
		})
	);
}
