import { useInitConfig, type Options } from "$lib/config";

export * from "./config";
export * from "./env";
export * from "./stores";

/**
 * initializes the app, including the theme, language and the api config
 */
export function useInit(options: Options) {
	return useInitConfig(options);
}
