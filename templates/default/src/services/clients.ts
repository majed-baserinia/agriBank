// import { useApiConfig } from "@htsc/ignite";
// import axios, { type AxiosInstance } from "axios";

// import { AccountApi, Configuration } from "./generated";
// import type { BaseAPI } from "./generated/base";

// /**
//  * you custom configurations
//  */
// type ConfigurationOptions = {};

// export const generateClient = <T extends typeof BaseAPI>(
// 	ApiClass: T,
// 	axiosInstance?: AxiosInstance,
// 	config?: ConfigurationOptions
// ) => {
// 	return () => {
// 		return new ApiClass(
// 			new Configuration({ basePath: useApiConfig.getState().baseUrl, ...config }),
// 			undefined,
// 			axiosInstance ?? axios
// 		) as InstanceType<T>;
// 	};
// };

// export const AccountsClient = generateClient(AccountApi);
