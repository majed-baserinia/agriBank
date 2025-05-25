import type { useRouter } from "$lib/facade/router";
import { z } from "zod";

export const searchParamsConfigSchema = z.object({
	Lang: z.string({ coerce: true }).default(""),
	Theme: z.string({ coerce: true }).toLowerCase().default("light"),
	/**
	 * if the app requires a postmessage from parent or not, ie if its `false` we don't require a postmessage
	 */
	Auth: z
		.string({ coerce: true })
		.toLowerCase()
		.transform((value) => value === "true")
		.pipe(z.boolean())
		.default("true")
});

export type SearchParamsConfig = z.infer<typeof searchParamsConfigSchema>;

export const useSearchParamsConfigLoader = (useRouter: useRouter) => {
	const { searchParams } = useRouter();
	return searchParamsConfigSchema.parse(searchParams);
};
