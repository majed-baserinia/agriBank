import { type Config } from "$lib/config/loaders/useConfigLoader";
import {
	searchParamsConfigSchema,
	useSearchParamsConfigLoader
} from "$lib/config/loaders/useSearchParamsConfigLoader";
import {
	useHandledConnection,
	type Props as HandledConnectionProps
} from "$lib/config/useHandledConnection";
import { useLoadAllConfigurations } from "$lib/config/useLoadAllConfigurations";
import { useIgniteStore } from "$lib/stores";
import type { AcceptedLanguages } from "$lib/stores/settings";

export type Options = Pick<HandledConnectionProps, "onInitializationFailed"> & {
	configOverrides?: Partial<Config>;
};

export function useInitConfig({ onInitializationFailed, configOverrides }: Options) {
	const { updateSettings: updateSettings } = useIgniteStore();
	const spConfig = useSearchParamsConfigLoader();

	const isConfigReady = useLoadAllConfigurations({
		spConfig,
		configOverrides,
		onConfigurationsInitialized: ({ theme, themeName, language, config }) => {
			updateSettings({
				theme: theme,
				language: language as AcceptedLanguages,
				themeName: themeName,
				config: config
			});
		}
	});
	const { readyToLoad } = useHandledConnection({
		needsInitData: spConfig.Auth,
		onIframeInitiated: (data) => {
			console.log("gereftam", data);
			updateSettings(data);
		},
		onInitializationFailed
	});

	return isConfigReady && readyToLoad;
}

export { searchParamsConfigSchema };
