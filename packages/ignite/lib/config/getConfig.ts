import { z } from "zod";

const configSchema = z.object({
	apiBaseUrl: z.string().url(),
	paletteUrl: z.string().url(),
	baseThemeUrl: z.union([
		z.literal("@local/base-theme/"),
		z.literal("@agribank/base-theme/"),
		z.string().url()
	])
});

export type Config = z.infer<typeof configSchema>;

export async function getConfig() {
	const res = await fetch(`/config.json`);
	const apiConf = configSchema.parse(await res.json());
	return apiConf;
}
