import { useAppStore } from "$/stores";
import { axios, callApi } from "@agribank/baran-typed-querykit";
import { baranMutateFn } from "@agribank/baran-typed-querykit/react";
import { useIgniteStore } from "@agribank/ignite";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { headers } from "./headers";

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
	const baseUrl = useIgniteStore((state) => state.settings.config.apiBaseUrl);
	const store = useAppStore();

	return useMutation({
		mutationFn: baranMutateFn<typeof requestSchema, typeof responseSchema>({
			async fn(data) {
				return await callApi(
					(param) =>
						axios.login.post("/login", param, {
							baseURL: baseUrl,
							headers
						}),
					{
						params: data,
						requestSchema: requestSchema,
						responseSchema: responseSchema
					}
				);
			}
		}),
		onSuccess(result, variables) {
			if (result.error) {
				return;
			}

			store.setLoginRequest(variables);
			store.setLoginResponse(result.response!);
		}
	});
}
