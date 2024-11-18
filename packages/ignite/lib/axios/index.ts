import { axiosForApi } from "$lib/axios/api-instance";
import { axiosForLogin } from "$lib/axios/login-instance";

export const axios = {
	login: axiosForLogin,
	api: axiosForApi
};
