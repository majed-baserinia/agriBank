// you can uncomment these in case of using @agribank/cli generate-clients command

// import {  useIgniteStore } from "@agribank/ignite";
// if you are using BARAN apis then provide this axios instance
// import { axios } from "@agribank/baran-typed-querykit";
// import { Configuration } from "$/services/.generated/configuration";
// import { useEffect } from "react";
// import { updateGlobalConfiguration } from "./.generated/base";

// export function useInitClients() {
//	const baseUrl = useIgniteStore((s) => s.settings.config.baseApiUrl);

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
