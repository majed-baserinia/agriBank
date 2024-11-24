import { useSearch } from "@tanstack/react-router";
import { z } from "zod";

export const searchParamsConfigSchema = z.object({
	Lang: z.string({ coerce: true }).default("fa-IR"),
	Theme: z.string({ coerce: true }).toLowerCase().default("light"),
	/**
	 * if the app requires a postmessage from parent or not, ie if its `false` we don't require a postmessage
	 */
	Auth: z
		.string({ coerce: true })
		.toLowerCase()
		.default("true")
		.transform((value) => value.toLowerCase() === "true")
		.pipe(z.boolean())
});

export const useSearchParamsConfigs = () => {
	const search = useSearch({ strict: false }) as unknown;
	return searchParamsConfigSchema.parse(search);
};
