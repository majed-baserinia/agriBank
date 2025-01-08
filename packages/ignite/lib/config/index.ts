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
import { useInitialSettingStore, type AcceptedLanguages } from "$lib/stores";

export type Options = Pick<HandledConnectionProps, "onInitializationFailed"> & {
	configOverrides?: Partial<Config>;
};

export function useInitConfig({ onInitializationFailed, configOverrides }: Options) {
	const { setSettings } = useInitialSettingStore();
	const spConfig = useSearchParamsConfigLoader();

	const isConfigReady = useLoadAllConfigurations({
		spConfig,
		configOverrides,
		onConfigurationsInitialized: ({ theme, themeName, language }) => {
			setSettings({
				theme: theme,
				language: language as AcceptedLanguages,
				themeName: themeName
			});
		}
	});
	const { readyToLoad } = useHandledConnection({
		needsInitData: spConfig.Auth,
		onIframeInitiated: (data) => {
			setSettings({
				idToken: data.idToken,
				refreshToken: data.refreshToken,
				osType: data.osType
			});
		},
		onInitializationFailed
	});

	return isConfigReady && readyToLoad;
}

export { searchParamsConfigSchema };
