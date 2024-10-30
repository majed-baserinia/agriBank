import { z } from "zod";

const envSchema = z.object({
	BASE_URL: z.string().url()
});

export const environment = envSchema.parse(import.meta.env);
