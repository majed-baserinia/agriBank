import type { callApi } from "$/client";
import { alertBaranError } from "$/react/utils/baran-error-alert";
import type { ValidationError } from "$/types";
import type { z } from "zod";

type Options<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny,
	TIsStrict extends boolean = false
> = {
	fn: (
		data: z.infer<TRequestSchema>
	) => ReturnType<typeof callApi<TRequestSchema, TResponseSchema, TIsStrict>>;
};

export function baranMutateFn<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny,
	TIsStrict extends boolean = false
>(options: Options<TRequestSchema, TResponseSchema, TIsStrict>) {
	return async (data: z.infer<NoInfer<TRequestSchema>>) => {
		const result = await options.fn(data);
		alertBaranError(result);
		return {
			validationError: result.error?.details as ValidationError<TRequestSchema> | undefined,
			...result
		};
	};
}
