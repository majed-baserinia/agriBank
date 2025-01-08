import { customerManagerRegisterPost } from "$/services";
import {
	RegisterCommand,
	RegisterOutputDto
} from "$/services/.generated/customer-management/zod/schemas";
import { callApi } from "@agribank/baran-typed-querykit";
import { baranMutateFn } from "@agribank/baran-typed-querykit/react";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import { headers } from "./headers";

export function useRegister() {
	return useMutation({
		mutationFn: baranMutateFn({
			async fn(data: z.infer<typeof RegisterCommand>) {
				return await callApi((params) => customerManagerRegisterPost(params, { headers }), {
					params: data,
					requestSchema: RegisterCommand,
					responseSchema: RegisterOutputDto
				});
			}
		})
	});
}
