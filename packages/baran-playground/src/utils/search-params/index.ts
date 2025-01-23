import { environments } from "$/features/environment";
import { searchParamsConfigSchema } from "@agribank/ignite";
import { z } from "zod";

export const ciArgsSchema = z.object({
	microBaseUrl: z.string().min(4).default("http://localhost"),
	microAppName: z.string().min(1),
	microPort: z.string({ coerce: true }).min(1),
	microSearchParams: z.string().optional(),
	microEnv: z.union([
		z.literal(environments[0]),
		z.literal(environments[1]),
		z.literal(environments[2])
	]),
	microIframeId: z.string().optional(),
	microUsername: z.string().min(2),
	microPassword: z.string().min(2)
});

const modifiedSearchParamsConfigSchema = searchParamsConfigSchema.extend({
	Theme: z.string().default("dark"),
	Lang: z.string().default("en-GB"),
	Auth: z.boolean({ coerce: true }).default(false)
});

export const searchParamsSchema = z.discriminatedUnion("ci", [
	z
		.object({
			ci: z.literal(false)
		})
		.merge(modifiedSearchParamsConfigSchema),
	z
		.object({
			ci: z.literal(true)
		})
		.merge(modifiedSearchParamsConfigSchema)
		.merge(ciArgsSchema),
	z
		.object({
			ci: z.undefined()
		})
		.merge(modifiedSearchParamsConfigSchema)
]);
