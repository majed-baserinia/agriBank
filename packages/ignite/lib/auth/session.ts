import type { AuthTokens } from "./types";

export const saveAuthTokens = (tokens: AuthTokens): void => {
	sessionStorage.setItem("id_token", tokens.idToken || "");
	sessionStorage.setItem("refresh_token", tokens.refreshToken || "");
};

export const getAuthTokens = (): AuthTokens | null => {
	const idToken = sessionStorage.getItem("id_token");
	const refreshToken = sessionStorage.getItem("refresh_token");
	if (idToken && refreshToken) {
		return { idToken, refreshToken };
	}
	return null;
};

export const clearAuth = (): void => {
	sessionStorage.removeItem("id_token");
	sessionStorage.removeItem("refresh_token");
};
