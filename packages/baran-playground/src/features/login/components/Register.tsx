import type { PreRegisterOutputDto } from "$/services/.generated/customer-management/zod/schemas";
import { useSettingsStore } from "$/stores/settings";
import { setBaranErrorsToForm } from "@agribank/baran-typed-querykit/react";
import { ButtonAdapter } from "@agribank/ui/components/ButtonAdapter";
import { Controlled } from "@agribank/ui/components/ControlledInput";
import { useLoadingHandler } from "@agribank/ui/components/Loader";
import { Otp as AgriOtp } from "@agribank/ui/components/Otp";
import { Box, Grid2 } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { usePreRegister } from "../services/pre-register";
import { useRegister } from "../services/register";
import { useVerifyRegister } from "../services/verify-register";
import type { RegisterInput } from "./index";

export function Register() {
	const form = useFormContext<RegisterInput>();
	const [otp, setOtp] = useState("");

	const { mutateAsync: postPreRegister, isPending: isSendingOtpPending } = usePreRegister();
	const { mutateAsync: postVerifyRegister, isPending: isVerifyPending } = useVerifyRegister();
	const { mutateAsync: postRegister, isPending: isRegisterPending } = useRegister();

	const settings = useSettingsStore();
	useLoadingHandler(isSendingOtpPending || isVerifyPending || isRegisterPending);

	function getOtpData() {
		return { otpCode: otp, ...form.getValues().preRegister };
	}

	async function handleVerifyOtp() {
		const otpResult = await postVerifyRegister(getOtpData());
		if (otpResult.error) {
			setBaranErrorsToForm(otpResult, form);
			return;
		}
		settings.setVerifyRegisterRequest(getOtpData());
		settings.setVerifyRegisterResponse(otpResult.response!);

		const registerResult = await postRegister({
			...form.getValues().register,
			keyToken: settings.user.output?.verifyRegister?.keyToken
		});
		if (registerResult.error) {
			setBaranErrorsToForm(registerResult, form);
			return;
		}
		settings.setRegisterRequest(form.getValues().register);
		settings.setRegisterResponse(registerResult.response!);
	}

	function handleSendOtp() {
		return new Promise<PreRegisterOutputDto | null>((resolve, reject) => {
			form.handleSubmit(
				async (data) => {
					const result = await postPreRegister(data.preRegister);
					if (result.error) {
						setBaranErrorsToForm(result, form);
						resolve(null);
						return;
					}
					resolve(result.response);
					settings.setPreRegisterRequest(data.preRegister);
					settings.setPreRegisterResponse(result.response!);
				},
				() => reject(new Error("form validation error"))
			);
		});
	}

	return (
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
					name="preRegister.accOrCifNum"
					label="account"
					type="number"
					helperText={form.formState.errors.preRegister?.accOrCifNum?.message}
					error={!!form.formState.errors.preRegister?.accOrCifNum?.message}
					defaultValue={settings.user.input?.preRegister?.accOrCifNum ?? ""}
					sx={{
						flexGrow: 1
					}}
				/>
				<Controlled.Input
					control={form.control}
					name="preRegister.birthDate"
					label="birth date"
					type="date"
					helperText={form.formState.errors.preRegister?.birthDate?.message}
					error={!!form.formState.errors.preRegister?.birthDate?.message}
					defaultValue={settings.user.input?.preRegister?.birthDate ?? ""}
					sx={{
						flexGrow: 1
					}}
				/>
			</Grid2>
			<Grid2
				container
				flexDirection={"row"}
				flexWrap={"nowrap"}
				gap={10}
			>
				<Controlled.Input
					control={form.control}
					name="preRegister.nationalCode"
					label="national code"
					type="text"
					helperText={form.formState.errors.preRegister?.nationalCode?.message}
					error={!!form.formState.errors.preRegister?.nationalCode?.message}
					defaultValue={settings.user.input?.preRegister?.nationalCode ?? ""}
				/>
				<Controlled.Input
					control={form.control}
					name="preRegister.smsHashCode"
					label="sms hash code"
					type="text"
					helperText={form.formState.errors.preRegister?.smsHashCode?.message}
					error={!!form.formState.errors.preRegister?.smsHashCode?.message}
					defaultValue={settings.user.input?.preRegister?.smsHashCode ?? ""}
				/>
			</Grid2>
			<Grid2
				container
				flexDirection={"row"}
				flexWrap={"nowrap"}
				gap={10}
			>
				<Controlled.Input
					control={form.control}
					name="login.username"
					label="username"
					type="text"
					helperText={form.formState.errors.login?.username?.message}
					error={!!form.formState.errors.login?.password?.message}
					defaultValue={settings.user.input?.login?.username ?? ""}
				/>
				<Controlled.Input
					control={form.control}
					name="login.password"
					label="password"
					type="password"
					helperText={form.formState.errors.login?.password?.message}
					error={!!form.formState.errors.login?.password?.message}
					defaultValue={settings.user.input?.login?.password ?? ""}
				/>
			</Grid2>
			<Grid2
				container
				flexDirection={"row"}
				flexWrap={"nowrap"}
				gap={10}
			>
				<Box
					flexGrow={1}
					flexShrink={0}
					flexBasis={0}
				>
					<AgriOtp
						sendOnLoad={false}
						handleSend={async () => {
							const result = await handleSendOtp();
							return result ? { maxLength: result.codeLength, timer: result.lifeTime } : false;
						}}
						agriInputProps={{
							helperText: form.formState.errors.verifyRegister?.otpCode?.message,
							error: !!form.formState.errors.verifyRegister?.otpCode?.message
						}}
						onChange={(e) => setOtp(e)}
					/>
				</Box>
				<ButtonAdapter
					onClick={handleVerifyOtp}
					variant="contained"
					muiButtonProps={{
						sx: {
							flexGrow: 1,
							flexShrink: 0,
							flexBasis: 0,
							padding: 0,
							height: "2.9rem"
						}
					}}
				>
					register
				</ButtonAdapter>
			</Grid2>
		</Grid2>
	);
}
