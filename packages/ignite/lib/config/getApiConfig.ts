import { z } from "zod";

const apiConfigSchema = z.object({
	apiBaseUrl: z.string().url(),
	themeUrl: z.string().url()
});

export async function getApiConfig() {
	const res = await fetch(
		`${import.meta.dynamic.env.DEV ? import.meta.dynamic.env.BASE_URL : ""}/config.json`
	);
	const apiConf = apiConfigSchema.parse(await res.json());
	return apiConf;
}
