import { useApiConfigLoader } from "$lib/config/loaders/useApiConfigLoader";
import { useConfigLoader, type Config } from "$lib/config/loaders/useConfigLoader";
import { useLanguageLoader } from "$lib/config/loaders/useLanguageLoader";
import { type SearchParamsConfig } from "$lib/config/loaders/useSearchParamsConfigLoader";
import { useThemeLoader } from "$lib/config/loaders/useThemeLoader";
import type { ThemeOptions } from "@mui/material";
import { useEffect } from "react";

export type Options = {
	spConfig: SearchParamsConfig;
	onConfigurationsInitialized: (options: {
		config: Config;
		language: string;
		themeName: string;
		theme: ThemeOptions;
	}) => void;
	configOverrides?: Partial<Config>;
};

export function useLoadAllConfigurations({
	spConfig,
	configOverrides,
	onConfigurationsInitialized
}: Options) {
	const { config, isConfigLoaded } = useConfigLoader(configOverrides);
	const { theme, isThemeLoaded } = useThemeLoader(
		config?.baseThemeUrl,
		config?.paletteUrl,
		spConfig.Theme
	);
	const isApiConfigInitialized = useApiConfigLoader(config);
	const { language, isLanguageLoaded } = useLanguageLoader(spConfig.Lang);

	const isEverythingLoaded =
		isConfigLoaded && isThemeLoaded && isApiConfigInitialized && isLanguageLoaded;

	useEffect(() => {
		if (!isEverythingLoaded) {
			return;
		}
		onConfigurationsInitialized({
			config: config!,
			theme: theme!,
			themeName: spConfig.Theme,
			language
		});
	}, [isEverythingLoaded]);

	return isEverythingLoaded;
}
