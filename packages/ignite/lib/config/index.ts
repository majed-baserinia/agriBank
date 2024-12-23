import { getConfig } from "$lib/config/getConfig";
import { getTheme } from "$lib/config/getTheme";
import {
	useHandledConnection,
	type Props as HandledConnectionProps
} from "$lib/config/useHandledConnection";
import {
	searchParamsConfigSchema,
	useSearchParamsConfigs
} from "$lib/config/useSearchParamsConfigs";
import { useApiConfig, useInitialSettingStore } from "$lib/stores";
import { initLanguagePacks } from "@agribank/i18n";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type Options = Pick<HandledConnectionProps, "onInitializationFailed">;

export function useInitConfig({ onInitializationFailed }: Options) {
	const { setSettings } = useInitialSettingStore();
	const { init: initApi } = useApiConfig();
	const spConfig = useSearchParamsConfigs();

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
	const [configReady, seConfigReady] = useState(false);
	const { i18n } = useTranslation();

	const memoizedGetConfig = useCallback(async () => {
		try {
			const config = await getConfig();
			initApi({ baseUrl: config.apiBaseUrl });

			//read lang and theme from query string
			const language = spConfig.Lang;
			const themeName = spConfig.Theme;

			await i18n.changeLanguage(language);

			//get the theme and set the language
			const theme = await getTheme(config.themeUrl, themeName);

			//set the settings {theme, language, idToken, refreshToken} to store
			setSettings({
				theme: theme,
				themeName: themeName,
				language: language as "fa-IR" | "en-GB"
			});

			seConfigReady(true);
		} catch (err) {
			//TODO: add a convenient alert for this
			//probably send a postmessage to parent
			alert("can't initiate app");
			console.error(err);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initApi, setSettings]);

	useEffect(() => {
		initLanguagePacks(i18n);
	}, [i18n]);

	useEffect(() => {
		void memoizedGetConfig();
	}, [memoizedGetConfig]);

	return configReady && readyToLoad;
}

export { searchParamsConfigSchema };
