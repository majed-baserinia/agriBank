import { getApiConfig } from "$lib/config/getApiConfig";
import { getTheme } from "$lib/config/getTheme";
import { useHandledConnection } from "$lib/config/useHandledConnection";
import { useInitialSettingStore } from "$lib/stores";
import { useApiConfig } from "$lib/stores/api/api";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export function useInitConfig() {
	const [searchParams] = useSearchParams();

	const { setSettings } = useInitialSettingStore();
	const { init: initApi } = useApiConfig();
	const { readyToLoad } = useHandledConnection({
		onIframeInitiated: (data) => {
			setSettings({
				idToken: data.idToken,
				refreshToken: data.refreshToken,
				osType: data.osType
			});
		}
	});
	const [configReady, seConfigReady] = useState(false);
	const { i18n } = useTranslation();

	const getConfig = useCallback(async () => {
		try {
			const apiConf = await getApiConfig();
			initApi({ baseUrl: apiConf.apiBaseUrl });

			//read lang and theme from query string
			const language = searchParams.get("Lang") ?? "fa-IR";
			const themeName = searchParams.get("Theme") ?? "light";
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
		void getConfig();
	}, [getConfig]);

	return configReady && readyToLoad;
}
