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
import type { useRouter } from "$lib/facade/router";
import { useIgniteStore } from "$lib/stores";
import type { AcceptedLanguages } from "$lib/stores/settings";

export type Options = Pick<HandledConnectionProps, "onInitializationFailed"> & {
	configOverrides?: Partial<Config>;
	/**
	 * based on your framework (we only support @tanstack/react-router and react-router) pass the provided router
	 * from @agribank/ignite/router/`framework`
	 */
	useRouter: useRouter;
};

export function useInitConfig({ onInitializationFailed, configOverrides, useRouter }: Options) {
	const { updateSettings, updateAuth } = useIgniteStore();
	const spConfig = useSearchParamsConfigLoader(useRouter);

	const isConfigReady = useLoadAllConfigurations({
		spConfig,
		configOverrides,
		onConfigurationsInitialized: ({ theme, themeName, language, config }) => {
			console.info(import.meta.dynamic.env.BASE_URL, "configurations initialized!");
			updateSettings({
				theme: theme,
				language: language as AcceptedLanguages,
				themeName: themeName,
				config: config
			});
		},
		onConfigurationsUpdated: ({ theme, themeName, language, config }) => {
			console.info(import.meta.dynamic.env.BASE_URL, "configurations updated!");
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
			updateAuth(data);
			updateSettings(data);
		},
		useRouter,
		onInitializationFailed
	});

	return isConfigReady && readyToLoad;
}

export { searchParamsConfigSchema };
