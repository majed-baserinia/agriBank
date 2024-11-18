// import { axios } from "@htsc/ignite";
// import { AxiosInstance } from "axios";
// import { AccountApi, Configuration } from "./generated";
// import { BaseAPI } from "./generated/base";

// /**
//  * you custom configurations
//  */
// type ConfigurationOptions = {};

// export const generateClient = <T extends typeof BaseAPI>(
// 	ApiClass: T,
// 	axiosInstance: AxiosInstance,
// 	config?: ConfigurationOptions
// ): InstanceType<T> => {
// 	return new ApiClass(
// 		new Configuration({ ...config }),
// 		undefined,
// 		axiosInstance
// 	) as InstanceType<T>;
// };

// const AccountsClient = generateClient(AccountApi, axios.api);
