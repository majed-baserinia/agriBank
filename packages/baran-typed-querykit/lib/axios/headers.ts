import { useIgniteStore } from "@agribank/ignite";
import type { InternalAxiosRequestConfig } from "axios";
import i18n from "i18next";

export function setCommonHeaders(config: InternalAxiosRequestConfig<any>) {
	config.headers["accept-language"] = i18n.language;

	const osType = useIgniteStore.getState().settings.osType;
	const osVersion = useIgniteStore.getState().settings.osVersion;
	const applicationName = useIgniteStore.getState().settings.applicationName;
	const applicationVersion = useIgniteStore.getState().settings.applicationVersion;
	const deviceId = useIgniteStore.getState().settings.deviceId;

	if (osType) {
		config.headers["Os-Type"] = osType;
	}
	if (osVersion) {
		config.headers["Os-Version"] = osVersion;
	}
	if (applicationName) {
		config.headers["Application-Name"] = applicationName;
	}
	if (applicationVersion) {
		config.headers["App-Version"] = applicationVersion;
	}
	if (deviceId) {
		config.headers["Device-Id"] = deviceId;
	}
}
