import { useInitConfig } from "$lib/config";

export * from "./auth";
export * from "./config";
export * from "./env";
export * from "./i18n";
export * from "./stores";

/**
 * initializes the app, including the theme, language and the api config
 */
export function useInit() {
	return useInitConfig();
}
