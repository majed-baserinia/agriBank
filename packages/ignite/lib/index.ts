import { useInitConfig } from "$lib/config";

export * from "./auth";
export * from "./config";
export * from "./env";
export * from "./stores";
export * from "./i18n/i18n";

/**
 * initialized the app, including the theme, language and the api config
 */
export function useInit() {
	return useInitConfig();
}
