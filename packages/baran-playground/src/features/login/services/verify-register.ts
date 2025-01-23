import { customerManagerVerifyregisterotpPost } from "$/services";
import {
	VerifyRegisterOtpCommand,
	VerifyRegisterOtpOutputDto
} from "$/services/.generated/customer-management/zod/schemas";
import { useAppStore } from "$/stores";
import { callApi } from "@agribank/baran-typed-querykit";
import { baranMutateFn } from "@agribank/baran-typed-querykit/react";
import { useMutation } from "@tanstack/react-query";
import { headers } from "./headers";

export function useVerifyRegister(key: string) {
	const store = useAppStore();

	return useMutation({
		mutationFn: baranMutateFn<typeof VerifyRegisterOtpCommand, typeof VerifyRegisterOtpOutputDto>({
			async fn(data) {
				return await callApi(
					(params) => customerManagerVerifyregisterotpPost(params, { headers }),
					{
						params: data,
						requestSchema: VerifyRegisterOtpCommand,
						responseSchema: VerifyRegisterOtpOutputDto
					}
				);
			}
		}),
		onSuccess(result, variables) {
			if (result.error) {
				return;
			}

			store.setVerifyRegisterRequest({
				key: key,
				data: variables
			});
			store.setVerifyRegisterResponse({
				key: key,
				data: result.response!
			});
		}
	});
}
