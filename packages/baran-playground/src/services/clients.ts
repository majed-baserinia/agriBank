import { Configuration } from "$/services/.generated/customer-management/configuration";
import { axios } from "@agribank/baran-typed-querykit";
import { useIgniteStore } from "@agribank/ignite";
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
