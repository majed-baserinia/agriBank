import { setCommonHeaders } from "$lib/axios/headers";
import axios from "axios";

export const axiosForLogin = axios.create({
	headers: {
		"Content-Type": "application/json"
	}
});

axiosForLogin.interceptors.request.use((config) => {
	setCommonHeaders(config);
	return config;
});
