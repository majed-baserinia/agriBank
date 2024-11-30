// import { axios, useApiConfig } from "@htsc/ignite";
// import { type AxiosInstance } from "axios";

// import { AccountApi, Configuration } from "./.generated";
// import type { BaseAPI } from "./.generated/base";

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
// 			axiosInstance
// 		) as InstanceType<T>;
// 	};
// };

// export const AccountsClient = generateClient(AccountApi, axios.api);
