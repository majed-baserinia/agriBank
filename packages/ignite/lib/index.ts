import { useInitConfig, type Options } from "$lib/config";

export * from "./auth";
export * from "./axios";
export * from "./config";
export * from "./env";
export * from "./stores";
export * from "./vite-plugins";

/**
 * initializes the app, including the theme, language and the api config
 */
export function useInit(options: Options) {
	return useInitConfig(options);
}
