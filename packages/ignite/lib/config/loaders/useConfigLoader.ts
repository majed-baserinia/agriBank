import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

const configSchema = z.object({
	apiBaseUrl: z.string().url(),
	basePaletteUrl: z.string().url(),
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

export function useConfigLoader(configOverrides?: Partial<Config>) {
	const [config, setConfig] = useState<Config>();
	const memoized = useMemo(() => {
		return { ...config, ...configOverrides };
	}, [config, configOverrides]);

	useEffect(() => {
		getConfig()
			.then((config) => {
				setConfig(config);
			})
			.catch((error) => {
				throw new Error("cannot load the config file", {
					cause: error
				});
			});
	}, []);

	return {
		config: memoized as Config | undefined,
		isConfigLoaded: memoized !== undefined
	};
}
