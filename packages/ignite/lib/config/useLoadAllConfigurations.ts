import { useConfigLoader, type Config } from "$lib/config/loaders/useConfigLoader";
import { useLanguageLoader } from "$lib/config/loaders/useLanguageLoader";
import { type SearchParamsConfig } from "$lib/config/loaders/useSearchParamsConfigLoader";
import { useThemeLoader } from "$lib/config/loaders/useThemeLoader";
import type { ThemeOptions } from "@mui/material";
import { useEffect, useRef } from "react";

type ConfigLoadedData = {
	config: Config;
	language: string;
	themeName: string;
	theme: ThemeOptions;
};

export type Options = {
	spConfig: SearchParamsConfig;
	onConfigurationsInitialized: (options: ConfigLoadedData) => void;
	onConfigurationsUpdated?: (options: ConfigLoadedData) => void;
	configOverrides?: Partial<Config>;
};

export function useLoadAllConfigurations({
	spConfig,
	configOverrides,
	onConfigurationsInitialized,
	// onConfigurationsUpdated
}: Options) {

	const { config, isConfigLoaded } = useConfigLoader(configOverrides);
	const { theme, isThemeLoaded } = useThemeLoader(
		config?.baseThemeUrl,
		config?.basePaletteUrl,
		spConfig.Theme
	);

	const { language, isLanguageLoaded } = useLanguageLoader(spConfig.Lang);
	const isInitialized = useRef(false);
	const isEverythingLoaded = isConfigLoaded && isThemeLoaded && isLanguageLoaded;

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
		isInitialized.current = true;
	}, [isEverythingLoaded]);

	// useEffect(() => {
	// 	if (!isEverythingLoaded || !isInitialized.current) {
	// 		return;
	// 	}
	// 	onConfigurationsUpdated?.({
	// 		config: config!,
	// 		theme: theme!,
	// 		themeName: spConfig.Theme,
	// 		language
	// 	});
	// }, [isEverythingLoaded, config, theme, spConfig.Theme, language]);

	return isEverythingLoaded;
}
