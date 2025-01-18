import { setCommonHeaders } from "$lib/axios/headers";
import { axiosForLogin } from "$lib/axios/login-instance";
import { useIgniteStore } from "$lib/stores";
import { alertAppIsStillRunning, sendPostMessage } from "@agribank/post-message";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

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
	alertAppIsStillRunning();
	const authTokens = useIgniteStore.getState().auth;
	if (authTokens) {
		const { idToken } = authTokens;
		config.headers.Authorization = `Bearer ${idToken}`;
	}
	setCommonHeaders(config);
	return config;
});

axiosForApi.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config;

		const authTokens = useIgniteStore.getState().auth;

		if (authTokens && error.response?.status === 401) {
			const refreshTokenValue = authTokens.refreshToken;
			try {
				const newIdToken = await refreshToken(refreshTokenValue!);
				axiosForApi.defaults.headers.common["Authorization"] = `Bearer ${newIdToken}`;
				return axiosForApi.request(originalRequest!);
			} catch (_refreshError) {
				useIgniteStore.getState().clearAuth();
				window.location.href = import.meta.dynamic.env.BASE_URL ?? "";
			}
			sendPostMessage("tokenIsNotValid", "true");
		}
		return Promise.reject(error);
	}
);

async function refreshToken(refreshToken: string): Promise<string | undefined> {
	const authTokens = useIgniteStore.getState().auth;
	const baseUrl = useIgniteStore.getState().settings.config.apiBaseUrl;
	axiosForLogin.defaults.headers.common["Authorization"] = `Bearer ${authTokens?.idToken}`;
	const response = await axiosForLogin.post<{ idToken: string; refreshToken: string }>(
		baseUrl + "/refreshtoken",
		{
			refreshToken: refreshToken
		}
	);

	const newIdToken = response.data.idToken;
	const newRefreshToken = response.data.refreshToken;
	useIgniteStore.getState().setAuth({ idToken: newIdToken, refreshToken: newRefreshToken });
	return newIdToken;
}
