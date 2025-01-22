import { customerManagerRegisterPost } from "$/services";
import {
	RegisterCommand,
	RegisterOutputDto
} from "$/services/.generated/customer-management/zod/schemas";
import { useAppStore } from "$/stores";
import { callApi } from "@agribank/baran-typed-querykit";
import { baranMutateFn } from "@agribank/baran-typed-querykit/react";
import { useMutation } from "@tanstack/react-query";
import { headers } from "./headers";

export function useRegister(accountNumber: string) {
	const store = useAppStore();

	return useMutation({
		mutationFn: baranMutateFn<typeof RegisterCommand, typeof RegisterOutputDto>({
			async fn(data) {
				return await callApi((params) => customerManagerRegisterPost(params, { headers }), {
					params: data,
					requestSchema: RegisterCommand,
					responseSchema: RegisterOutputDto
				});
			}
		}),
		onSuccess(result, variables) {
			if (result.error) {
				return;
			}

			store.setRegisterRequest({
				accountNumber: accountNumber,
				data: variables
			});
			store.setRegisterResponse({
				accountNumber: accountNumber,
				data: result.response!
			});
		}
	});
}
