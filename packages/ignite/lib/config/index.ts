import { getApiConfig } from "$lib/config/getApiConfig";
import { getTheme } from "$lib/config/getTheme";
import { useHandledConnection } from "$lib/config/useHandledConnection";
import { useInitialSettingStore } from "$lib/stores";
import useApiConfig from "$lib/stores/api/api";
import { changeLanguage } from "i18next";
import { useCallback, useEffect, useState } from "react";
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

	const getConfig = useCallback(async () => {
		try {
			const apiConf = await getApiConfig();
			initApi({ baseUrl: apiConf.apiBaseUrl });

			//read lang and theme from query string
			const language = searchParams.get("Lang") ?? "fa-IR";
			const themeName = searchParams.get("Theme") ?? "light";
			void changeLanguage(language);

			//get the theme and set the language
			const theme = await getTheme(themeName, apiConf.ThemeRoute);

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
			alert("can't initiate");
			console.error(err);
		}
	}, [initApi, setSettings]);

	useEffect(() => {
		void getConfig();
	}, [getConfig]);

	return configReady && readyToLoad;
}
