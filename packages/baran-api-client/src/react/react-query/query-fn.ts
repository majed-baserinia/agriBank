import type { callApi } from "$/client";
import { alertBaranError as alertBaranErrorIfRequired } from "$/react/alert/baran-error-alert";
import type { ValidationError } from "$/types";
import type { z } from "zod";

type Options<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny,
	TIsStrict extends boolean = false
> = {
	fn: () => ReturnType<typeof callApi<TRequestSchema, TResponseSchema, TIsStrict>>;
};

export function baranQueryFn<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny,
	TIsStrict extends boolean = false
>(options: Options<TRequestSchema, TResponseSchema, TIsStrict>) {
	return async () => {
		const result = await options.fn();
		alertBaranErrorIfRequired(result);
		return {
			validationError: result.error?.details as ValidationError<TRequestSchema> | undefined,
			...result
		};
	};
}
