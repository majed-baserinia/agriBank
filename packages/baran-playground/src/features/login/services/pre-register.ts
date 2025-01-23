import { customerManagerPreregisterPost } from "$/services";
import {
	PreRegisterCommand,
	PreRegisterOutputDto
} from "$/services/.generated/customer-management/zod/schemas";
import { useAppStore } from "$/stores";
import { callApi } from "@agribank/baran-typed-querykit";
import { baranMutateFn } from "@agribank/baran-typed-querykit/react";
import { useMutation } from "@tanstack/react-query";
import { headers } from "./headers";

export function usePreRegister(key: string) {
	const store = useAppStore();

	return useMutation({
		mutationFn: baranMutateFn<typeof PreRegisterCommand, typeof PreRegisterOutputDto>({
			async fn(data) {
				return await callApi((params) => customerManagerPreregisterPost(params, { headers }), {
					params: data,
					requestSchema: PreRegisterCommand,
					responseSchema: PreRegisterOutputDto
				});
			}
		}),
		onSuccess(result, variables) {
			if (result.error) {
				return;
			}

			store.setPreRegisterRequest({
				key: key,
				data: variables
			});
			store.setPreRegisterResponse({
				key: key,
				data: result.response!
			});
		}
	});
}
