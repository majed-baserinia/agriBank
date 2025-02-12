import { useCurrentEnvironmentActiveUser } from "$/features/login";
import { customerManagerConfirmupgradeleveltwoPost } from "$/services";
import { ConfirmUpgradeForLevelTwoOutputDto } from "$/services/.generated/customer-management/zod/schemas";
import { useAppStore } from "$/stores";
import { callApi } from "@agribank/baran-typed-querykit";
import { baranMutateFn } from "@agribank/baran-typed-querykit/react";
import { useMutation } from "@tanstack/react-query";
import { ConfirmUpgradeForLevelTwoCommand } from "../schemas/login-form";
import { headers } from "./headers";

export function useConfirmUpgradeLevel2(key: string) {
	const store = useAppStore();
	const user = useCurrentEnvironmentActiveUser();

	return useMutation({
		mutationFn: baranMutateFn<
			typeof ConfirmUpgradeForLevelTwoCommand,
			typeof ConfirmUpgradeForLevelTwoOutputDto
		>({
			async fn(data) {
				return await callApi(
					(params) =>
						customerManagerConfirmupgradeleveltwoPost(params, {
							headers: {
								...headers,
								Authorization: `Bearer ${user?.output.login?.idToken}`
							}
						}),
					{
						params: data,
						requestSchema: ConfirmUpgradeForLevelTwoCommand,
						responseSchema: ConfirmUpgradeForLevelTwoOutputDto
					}
				);
			}
		}),
		onSuccess(result, variables) {
			if (result.error) {
				return;
			}

			store.setUpgradeLevel2ConfirmRequest({
				key: key,
				data: variables
			});
			store.setUpgradeLevel2ConfirmResponse({
				key: key,
				data: result.response!
			});
		}
	});
}
