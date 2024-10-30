import { z } from "zod";

const apiConfigSchema = z.object({
	apiBaseUrl: z.string().url(),
	ThemeRoute: z.string().url()
});

export async function getApiConfig() {
	const res = await fetch("/api-config.json");
	const apiConf = apiConfigSchema.parse(await res.json());
	return apiConf;
}
