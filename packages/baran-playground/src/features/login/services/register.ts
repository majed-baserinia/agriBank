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

export function useRegister() {
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

			store.setRegisterRequest(variables);
			store.setRegisterResponse(result.response!);
		}
	});
}
