import { clearAuth, getAuthTokens } from "$lib/auth";
import { refreshToken } from "$lib/axios/login-instance";
import { useInitialSettingStore } from "$lib/stores";
import { sendPostMessage } from "@htsc/post-message";
import axios, { AxiosError, type AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import i18n from "i18next";

const axiosInstance = axios.create({
	headers: {
		"Content-Type": "application/json"
	}
});

axiosRetry(axiosInstance, {
	retries: 1,
	retryCondition: (error) => {
		return error.response?.status === 401;
	}
});

axiosInstance.interceptors.request.use((config) => {
	const authTokens = getAuthTokens();
	if (authTokens) {
		const { idToken } = authTokens;
		config.headers.Authorization = `Bearer ${idToken}`;
	}
	config.headers["accept-language"] = i18n.language;
	config.headers["os-type"] = useInitialSettingStore.getState().settings.osType;
	return config;
});

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async <TResponse>(error: AxiosError) => {
		const originalRequest = error.config;

		const authTokens = getAuthTokens();

		if (authTokens && error.response?.status === 401) {
			const refreshTokenValue = authTokens.refreshToken;
			try {
				const newIdToken = await refreshToken(refreshTokenValue!);
				axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newIdToken}`;
				return axiosInstance.request(originalRequest!);
			} catch (refreshError) {
				clearAuth();
				window.location.href = import.meta.env.BASE_URL;
			}
			sendPostMessage("tokenIsNotValid", "true");
		}
		return Promise.reject(error);
	}
);
