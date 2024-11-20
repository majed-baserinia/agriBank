import { z } from "zod";

const envSchema = z.object({
	VITE_APP_BASE_URL: z.string()
});

export const environment = envSchema.parse({
	...import.meta.dynamic.env
});
