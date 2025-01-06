import { callApi } from "@agribank/baran-typed-querykit";
import { baranMutateFn } from "@agribank/baran-typed-querykit/react";
import { axios, useApiConfig } from "@agribank/ignite";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const requestSchema = z.object({
	username: z.string(),
	password: z.string()
});
export const responseSchema = z.object({
	idToken: z.string(),
	refreshToken: z.string()
});

export type LoginRequest = z.infer<typeof requestSchema>;

export function useLogin() {
	const baseUrl = useApiConfig((state) => state.baseUrl);
	return useMutation({
		mutationFn: baranMutateFn({
			async fn(data: LoginRequest) {
				return await callApi(
					(param: LoginRequest) =>
						axios.login.post("/login", param, {
							baseURL: baseUrl
						}),
					{
						params: data,
						requestSchema: requestSchema,
						responseSchema: responseSchema
					}
				);
			}
		})
	});
}
