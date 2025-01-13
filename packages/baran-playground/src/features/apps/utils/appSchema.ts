import { z } from "zod";

export const appSchema = z.object({
	title: z.string(),
	url: z.string().url(),
	searchParams: z
		.string()
		.optional()
		.refine(
			(v) => {
				try {
					new URLSearchParams(v);
					return true;
				} catch (_e) {
					return false;
				}
			},
			{
				message: "invalid search params"
			}
		)
});
