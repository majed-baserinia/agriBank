// you can uncomment these in case of using @agribank/cli generate-clients command

// import { axios, useIgniteStore } from "@agribank/ignite";

// import { Configuration } from "$/services/.generated/configuration";
// import { useEffect } from "react";
// import { updateGlobalConfiguration } from "./.generated/base";

// export function useInitClients() {
//	const baseUrl = useIgniteStore((s) => s.settings.config.apiBaseUrl);

// 	useEffect(() => {
// 		updateGlobalConfiguration(
// 			new Configuration({
// 				axiosInstance: axios.api,
// 				basePath: baseUrl
// 			})
// 		);
//      /* add other configurations here */
// 	}, [baseUrl]);
// }
