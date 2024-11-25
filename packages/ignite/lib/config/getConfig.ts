import { z } from "zod";

const apiConfigSchema = z.object({
	apiBaseUrl: z.string().url(),
	themeUrl: z.string().url()
});

export async function getConfig() {
	const res = await fetch(`/config.json`);
	const apiConf = apiConfigSchema.parse(await res.json());
	return apiConf;
}
