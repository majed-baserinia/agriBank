import { useCurrentEnvironmentActiveUser } from "$/features/login";
import { customerManagerRequestupgradeleveltwoPost } from "$/services";
import { RequestUpgradeForLevelTwoOutputDto } from "$/services/.generated/customer-management/zod/schemas";
import { useAppStore } from "$/stores";
import { callApi } from "@agribank/baran-typed-querykit";
import { baranMutateFn } from "@agribank/baran-typed-querykit/react";
import { useMutation } from "@tanstack/react-query";
import { RequestUpgradeForLevelTwoCommand } from "../schemas/login-form";
import { headers } from "./headers";

export function useUpgradeLevel2OtpRequest(key: string) {
	const store = useAppStore();
	const user = useCurrentEnvironmentActiveUser();

	return useMutation({
		mutationFn: baranMutateFn<
			typeof RequestUpgradeForLevelTwoCommand,
			typeof RequestUpgradeForLevelTwoOutputDto
		>({
			async fn(data) {
				return await callApi(
					(params) =>
						customerManagerRequestupgradeleveltwoPost(params, {
							headers: {
								...headers,
								Authorization: `Bearer ${user?.output.login?.idToken}`
							}
						}),
					{
						params: data,
						requestSchema: RequestUpgradeForLevelTwoCommand,
						responseSchema: RequestUpgradeForLevelTwoOutputDto
					}
				);
			}
		}),
		onSuccess(result, variables) {
			if (result.error) {
				return;
			}

			store.setUpgradeLevel2OtpRequest({
				key: key,
				data: variables
			});
			store.setUpgradeLevel2OtpResponse({
				key: key,
				data: result.response!
			});
		}
	});
}
