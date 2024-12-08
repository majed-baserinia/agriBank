// you can uncomment these in case of using @agribank/cli generate-clients command

// import { axios, useApiConfig } from "@agribank/ignite";

// import { Configuration } from "$/services/.generated/configuration";
// import { useEffect } from "react";
// import { updateGlobalConfiguration } from "./.generated/base";

// export function useInitClients() {
// 	const baseUrl = useApiConfig((s) => s.baseUrl);

// 	useEffect(() => {
// 		updateGlobalConfiguration(
// 			new Configuration({
// 				axiosInstance: axios.api,
// 				basePath: baseUrl
// 			})
// 		);
// 	}, [baseUrl]);
// }
