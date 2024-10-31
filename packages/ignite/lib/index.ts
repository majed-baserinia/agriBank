import { useInitConfig } from "$lib/config";
import "./i18n"; // TODO: sideEffect import, fix later

export * from "./auth";
export * from "./config";
export * from "./env";
export * from "./stores";
export * from "./i18n";

/**
 * initialized the app, including the theme, language and the api config
 */
export function useInit() {
	return useInitConfig();
}
