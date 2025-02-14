import { useCurrentEnvironmentActiveUser } from "$/features/login";
import { setBaranErrorsToForm } from "@agribank/baran-typed-querykit/react";
import { ButtonAdapter } from "@agribank/ui/components/ButtonAdapter";
import { Controlled } from "@agribank/ui/components/ControlledInput";
import { useLoadingHandler } from "@agribank/ui/components/Loader";
import { Otp } from "@agribank/ui/components/Otp";
import { SwitchAdapter } from "@agribank/ui/components/SwitchAdapter";
import { pushAlert } from "@agribank/ui/stores/alerts";
import { Box, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { RegisterInput } from "../components";
import { useConfirmUpgradeLevel2 } from "../services/confirm-upgrade-level2";
import { useUpgradeLevel2OtpRequest } from "../services/upgrade-level2-otp-request";

export function UpgradeLevel2() {
	const form = useFormContext<RegisterInput>();
	const user = useCurrentEnvironmentActiveUser();

	const [isLevel2UpgradeEnabled, setIsLevel2UpgradeEnabled] = useState(
		!!user?.input.upgradeLevel2OtpRequest?.cardNumber
	);
	const [otp, setOtp] = useState("");

	const { mutateAsync: sendOtp, isPending: isOtpRequestPending } = useUpgradeLevel2OtpRequest(
		user?.input.preRegister?.accOrCifNum ?? ""
	);
	const { mutateAsync: confirmUpgrade, isPending: isConfirmRequestPending } =
		useConfirmUpgradeLevel2(user?.input.preRegister?.accOrCifNum ?? "");

	useLoadingHandler(isOtpRequestPending || isConfirmRequestPending);

	async function handleSendOtp() {
		const result = await sendOtp({
			cardNumber: form.getValues("upgradeLevel2OtpRequest.cardNumber")
		});
		if (result.error) {
			setBaranErrorsToForm(
				{
					validationError: result.validationError
				},
				form,
				"upgradeLevel2OtpRequest"
			);
			throw new Error("form validation error");
		}

		return result.response;
	}

	async function handleUpgradeToLevel2() {
		console.log({
			...form.getValues("upgradeLevel2Confirm"),
			...form.getValues("upgradeLevel2OtpRequest"),
			code: otp
		});
		const result = await confirmUpgrade({
			...form.getValues("upgradeLevel2Confirm"),
			...form.getValues("upgradeLevel2OtpRequest"),
			code: otp
		});
		if (result.error) {
			setBaranErrorsToForm(
				{
					validationError: result.validationError
				},
				form,
				"upgradeLevel2OtpRequest"
			);
			return;
		}
		pushAlert({
			type: "success",
			messageText: "upgraded to level2"
		});
	}

	return (
		<Grid2
			container
			gap={10}
			flexDirection={"column"}
			paddingLeft={5}
		>
			<SwitchAdapter
				switchProps={{
					onClick: () => {
						setIsLevel2UpgradeEnabled(!isLevel2UpgradeEnabled);
					}
				}}
				type="small"
				label="show upgrade to level 2 form"
				checked={isLevel2UpgradeEnabled}
			/>

			{isLevel2UpgradeEnabled &&
				(user?.output.login?.idToken ? (
					<Grid2
						container
						flexDirection={"column"}
						gap={10}
					>
						<Grid2
							container
							flexDirection={"row"}
							flexWrap={"nowrap"}
							gap={10}
						>
							<Controlled.Input
								control={form.control}
								name="upgradeLevel2OtpRequest.cardNumber"
								label="card number"
								type="card"
								helperText={form.formState.errors.upgradeLevel2OtpRequest?.cardNumber?.message}
								error={form.getFieldState("upgradeLevel2OtpRequest.cardNumber").invalid}
								defaultValue={user?.input?.upgradeLevel2OtpRequest?.cardNumber?.toString() ?? ""}
							/>
							<Controlled.Input
								control={form.control}
								name="upgradeLevel2Confirm.cvV2"
								label="cvv2"
								type="text"
								helperText={form.formState.errors.upgradeLevel2Confirm?.cvV2?.message}
								error={form.getFieldState("upgradeLevel2Confirm.cvV2").invalid}
								defaultValue={user?.input?.upgradeLevel2Confirm?.cvV2?.toString() ?? ""}
							/>
						</Grid2>
						<Grid2
							container
							flexDirection={"row"}
							flexWrap={"nowrap"}
							gap={10}
						>
							<Grid2
								container
								flexDirection={"column"}
								flexGrow={1}
								flexShrink={0}
								flexBasis={0}
								gap={10}
							>
								<Controlled.Input
									control={form.control}
									name="upgradeLevel2Confirm.expireDate"
									label="expire date (mmdd)"
									type="text"
									helperText={form.formState.errors.upgradeLevel2Confirm?.expireDate?.message}
									error={form.getFieldState("upgradeLevel2Confirm.expireDate").invalid}
									defaultValue={user?.input?.upgradeLevel2Confirm?.expireDate?.toString() ?? ""}
								/>
								<ButtonAdapter
									variant="contained"
									onClick={form.handleSubmit(handleUpgradeToLevel2, (e) => console.error(e))}
									muiButtonProps={{
										sx: {
											height: "2.9rem"
										}
									}}
								>
									upgrade {user.output.upgradeLevel2Confirm?.deviceId ? "(already upgraded)" : ""}
								</ButtonAdapter>
							</Grid2>
							<Box
								flexGrow={1}
								flexShrink={0}
								flexBasis={0}
							>
								<Otp
									sendOnLoad={false}
									onSendSmsClick={async () => {
										try {
											const result = await handleSendOtp();
											return result
												? { maxLength: result.codeLength, timer: result.lifeTime }
												: false;
										} catch (_e) {
											return false;
										}
									}}
									agriInputProps={{
										helperText: form.formState.errors.verifyRegister?.otpCode?.message,
										error: !!form.formState.errors.verifyRegister?.otpCode?.message
									}}
									onChange={(e) => setOtp(e)}
								/>
							</Box>
						</Grid2>
					</Grid2>
				) : (
					<Typography
						variant="bodyLg"
						color="error"
					>
						Please select a logged in user first
					</Typography>
				))}
		</Grid2>
	);
}
