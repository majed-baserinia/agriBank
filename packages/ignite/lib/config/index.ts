import { getApiConfig } from "$lib/config/getApiConfig";
import { getTheme } from "$lib/config/getTheme";
import {
	useHandledConnection,
	type Props as HandledConnectionProps
} from "$lib/config/useHandledConnection";
import {
	searchParamsConfigSchema,
	useSearchParamsConfigs
} from "$lib/config/useSearchParamsConfigs";
import { useInitialSettingStore } from "$lib/stores";
import { useApiConfig } from "$lib/stores/api/api";
import { initLanguagePacks } from "@htsc/i18n";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type Options = Pick<HandledConnectionProps, "onInitializationFailed">;

export function useInitConfig({ onInitializationFailed }: Options) {
	const { setSettings } = useInitialSettingStore();
	const { init: initApi } = useApiConfig();
	const { readyToLoad } = useHandledConnection({
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
	const spConfig = useSearchParamsConfigs();

	const getConfig = useCallback(async () => {
		try {
			const apiConf = await getApiConfig();
			initApi({ baseUrl: apiConf.apiBaseUrl });

			//read lang and theme from query string
			const language = spConfig.Lang;
			const themeName = spConfig.Theme;

			await i18n.changeLanguage(language);

			//get the theme and set the language
			const theme = await getTheme(apiConf.ThemeRoute, themeName);

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
		void getConfig();
	}, [getConfig]);

	return configReady && readyToLoad;
}

export { searchParamsConfigSchema };
