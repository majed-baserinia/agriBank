import { customerManagerPreregisterPost } from "$/services";
import {
	PreRegisterCommand,
	PreRegisterOutputDto
} from "$/services/.generated/customer-management/zod/schemas";
import { useAppStore } from "$/stores";
import { callApi } from "@agribank/baran-typed-querykit";
import { baranMutateFn } from "@agribank/baran-typed-querykit/react";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import { headers } from "./headers";

export function usePreRegister() {
	const store = useAppStore();

	return useMutation({
		mutationFn: baranMutateFn({
			async fn(data: z.infer<typeof PreRegisterCommand>) {
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

			store.setPreRegisterRequest(variables);
			store.setPreRegisterResponse(result.response);
		}
	});
}
