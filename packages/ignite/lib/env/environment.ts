import { z } from "zod";

const envSchema = z.object({
	BASE_URL: z.string()
});

export const environment = envSchema.parse({ BASE_URL: import.meta.dynamic.env.BASE_URL });
