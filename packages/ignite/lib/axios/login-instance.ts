import { getAuthTokens, saveAuthTokens } from "$lib/auth";
import { useApiConfig, useInitialSettingStore } from "$lib/stores";
import axios from "axios";
import i18n from "i18next";

export const axiosForLogin = axios.create({
	headers: {
		"Content-Type": "application/json"
	}
});

export const refreshToken = async (refreshToken: string): Promise<string | undefined> => {
	const authTokens = getAuthTokens();
	const baseUrl = useApiConfig.getState().baseUrl;
	axiosForLogin.defaults.headers.common["Authorization"] = `Bearer ${authTokens?.idToken}`;
	const response = await axiosForLogin.post(baseUrl + "/refreshtoken", {
		refreshToken: refreshToken
	});
	const newIdToken = response.data.idToken;
	const newRefreshToken = response.data.refreshToken;
	saveAuthTokens({ idToken: newIdToken, refreshToken: newRefreshToken });
	return newIdToken;
};

axiosForLogin.interceptors.request.use((config) => {
	config.headers["accept-language"] = i18n.language;
	config.headers["os-type"] = useInitialSettingStore.getState().settings.osType;

	return config;
});
