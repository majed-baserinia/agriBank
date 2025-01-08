import type { Config } from "$lib/config/loaders/useConfigLoader";
import { useApiConfig } from "$lib/stores";
import { useEffect } from "react";

export function useApiConfigLoader(config: Config | undefined) {
	const { isInitialized, update } = useApiConfig();

	useEffect(() => {
		if (!config) {
			return;
		}
		update({
			baseUrl: config.apiBaseUrl
		});
	}, [update, config?.apiBaseUrl]);

	return isInitialized;
}
