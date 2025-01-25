import { setCommonHeaders } from "$/axios/headers";
import { axiosForLogin } from "$/axios/login-instance";
import { setNetworkError } from "$/utils";
import { useIgniteStore } from "@agribank/ignite";
import { alertAppIsStillRunning, sendPostMessage } from "@agribank/post-message";
import axios, { AxiosError, type AxiosResponse } from "axios";
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
	const { idToken } = useIgniteStore.getState().auth;
	if (idToken) {
		config.headers.Authorization = `Bearer ${idToken}`;
	}
	setCommonHeaders(config);
	return config;
});

axiosForApi.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		if (!error.config) {
			return Promise.reject(error);
		}

		const originalRequest = error.config;

		const { refreshToken: refreshTokenValue } = useIgniteStore.getState().auth;

		if (refreshTokenValue && error.response?.status === 401) {
			try {
				const newIdToken = await refreshToken(refreshTokenValue);
				axiosForApi.defaults.headers.common["Authorization"] = `Bearer ${newIdToken}`;
				return axiosForApi.request(originalRequest);
			} catch (_refreshError) {
				useIgniteStore.getState().clearAuth();
				window.location.href = import.meta.dynamic.env.BASE_URL ?? "";
			}
			sendPostMessage("tokenIsNotValid", "true");
		}

		if (
			error.status !== 500 &&
			(error.code === AxiosError.ERR_NETWORK || error.code === AxiosError.ETIMEDOUT)
		) {
			setNetworkError(error);
			return Promise.reject(error);
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
	useIgniteStore.getState().updateAuth({ idToken: newIdToken, refreshToken: newRefreshToken });
	return newIdToken;
}
