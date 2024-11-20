import { clearAuth, getAuthTokens, saveAuthTokens } from "$lib/auth";
import { axiosForLogin } from "$lib/axios/login-instance";
import { useApiConfig, useInitialSettingStore } from "$lib/stores";
import { sendPostMessage } from "@htsc/post-message";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import i18n from "i18next";

export const axiosForApi = axios.create({
	headers: {
		"Content-Type": "application/json"
	}
});

axiosRetry(axiosForApi, {
	retries: 1,
	retryCondition: (error) => {
		return error.response?.status === 401;
	}
});

axiosForApi.interceptors.request.use((config) => {
	const authTokens = getAuthTokens();
	if (authTokens) {
		const { idToken } = authTokens;
		config.headers.Authorization = `Bearer ${idToken}`;
	}
	config.headers["accept-language"] = i18n.language;
	config.headers["os-type"] = useInitialSettingStore.getState().settings.osType;
	return config;
});

axiosForApi.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config;

		const authTokens = getAuthTokens();

		if (authTokens && error.response?.status === 401) {
			const refreshTokenValue = authTokens.refreshToken;
			try {
				const newIdToken = await refreshToken(refreshTokenValue!);
				axiosForApi.defaults.headers.common["Authorization"] = `Bearer ${newIdToken}`;
				return axiosForApi.request(originalRequest!);
			} catch (_refreshError) {
				clearAuth();
				window.location.href = import.meta.env.BASE_URL;
			}
			sendPostMessage("tokenIsNotValid", "true");
		}
		return Promise.reject(error);
	}
);

async function refreshToken(refreshToken: string): Promise<string | undefined> {
	const authTokens = getAuthTokens();
	const baseUrl = useApiConfig.getState().baseUrl;
	axiosForLogin.defaults.headers.common["Authorization"] = `Bearer ${authTokens?.idToken}`;
	const response = await axiosForLogin.post<{ idToken: string; refreshToken: string }>(
		baseUrl + "/refreshtoken",
		{
			refreshToken: refreshToken
		}
	);

	const newIdToken = response.data.idToken;
	const newRefreshToken = response.data.refreshToken;
	saveAuthTokens({ idToken: newIdToken, refreshToken: newRefreshToken });
	return newIdToken;
}
