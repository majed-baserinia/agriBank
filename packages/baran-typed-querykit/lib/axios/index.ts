import { axiosForApi } from "$/axios/api-instance";
import { axiosForLogin } from "$/axios/login-instance";

export const axios = {
	login: axiosForLogin,
	api: axiosForApi
};
