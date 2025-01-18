import { useIgniteStore } from "$lib/stores";
import type { InternalAxiosRequestConfig } from "axios";
import i18n from "i18next";

export function setCommonHeaders(config: InternalAxiosRequestConfig<any>) {
	config.headers["accept-language"] = i18n.language;
	config.headers["os-type"] = useIgniteStore.getState().settings.osType;
	//config.headers["os-version"] = useIgniteStore.getState().settings.osVersion;
}
