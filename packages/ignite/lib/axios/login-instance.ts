import { useInitialSettingStore } from "$lib/stores";
import axios from "axios";
import i18n from "i18next";

export const axiosForLogin = axios.create({
	headers: {
		"Content-Type": "application/json"
	}
});

axiosForLogin.interceptors.request.use((config) => {
	config.headers["accept-language"] = i18n.language;
	config.headers["os-type"] = useInitialSettingStore.getState().settings.osType;

	return config;
});
