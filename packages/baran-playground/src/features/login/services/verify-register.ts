import { customerManagerVerifyregisterotpPost } from "$/services";
import {
	VerifyRegisterOtpCommand,
	VerifyRegisterOtpOutputDto
} from "$/services/.generated/customer-management/zod/schemas";
import { useAppStore } from "$/stores";
import { callApi } from "@agribank/baran-typed-querykit";
import { baranMutateFn } from "@agribank/baran-typed-querykit/react";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import { headers } from "./headers";

export function useVerifyRegister() {
	const store = useAppStore();

	return useMutation({
		mutationFn: baranMutateFn({
			async fn(data: z.infer<typeof VerifyRegisterOtpCommand>) {
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

			store.setVerifyRegisterRequest(variables);
			store.setVerifyRegisterResponse(result.response);
		}
	});
}
