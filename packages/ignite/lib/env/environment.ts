import { z } from "zod";

const envSchema = z.object({
	VITE_BASE_URL: z.string(),
	VITE_FORCE_IFRAME_READY: z.boolean({ coerce: true }).optional().default(false)
});

export const environment = envSchema.parse({
	...import.meta.dynamic.env
});

console.log(environment);
