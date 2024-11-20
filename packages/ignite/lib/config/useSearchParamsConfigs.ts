import { useSearch } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
	Lang: z.string().optional().default("fa-IR"),
	Theme: z.string().toLowerCase().optional().default("light"),
	/**
	 * if the app requires a postmessage from parent or not, ie if its `false` we don't require a postmessage
	 */
	Auth: z
		.string()
		.toLowerCase()
		.optional()
		.default("true")
		.transform((value) => value === "true")
		.pipe(z.boolean())
});

export const useSearchParamsConfigs = () => {
	const search = useSearch({ strict: false }) as unknown;
	return schema.parse(search);
};
