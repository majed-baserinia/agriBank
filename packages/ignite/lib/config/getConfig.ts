import { z } from "zod";

const apiConfigSchema = z.object({
	apiBaseUrl: z.string().url(),
	paletteUrl: z.string().url(),
	baseThemeUrl: z.union([
		z.literal("@local/base-theme/"),
		z.literal("@agribank/base-theme/"),
		z.string().url()
	])
});

export async function getConfig() {
	const res = await fetch(`/config.json`);
	const apiConf = apiConfigSchema.parse(await res.json());
	return apiConf;
}
