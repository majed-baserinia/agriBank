import { axios, useIgniteStore } from "@agribank/ignite";

import { Configuration } from "$/services/.generated/customer-management/configuration";
import { useEffect } from "react";
import { updateGlobalConfiguration } from "./.generated/customer-management/base";

export function useInitClients() {
	const baseUrl = useIgniteStore((s) => s.settings.config.apiBaseUrl);

	useEffect(() => {
		updateGlobalConfiguration(
			new Configuration({
				axiosInstance: axios.api,
				basePath: baseUrl
			})
		);
	}, [baseUrl]);
}
