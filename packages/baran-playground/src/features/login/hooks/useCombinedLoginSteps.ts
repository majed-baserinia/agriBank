import type { VerifyRegisterOtpCommand } from "$/services";
import { setBaranErrorsToForm } from "@agribank/baran-typed-querykit/react";
import { type UseFormReturn } from "react-hook-form";
import type { RegisterInput } from "../components";
import { useLogin } from "../services/login";
import { useRegister } from "../services/register";
import { useVerifyRegister } from "../services/verify-register";

export function useCombinedLoginSteps(form: UseFormReturn<RegisterInput>, accountNumber: string) {
	const { mutateAsync: postVerifyRegister, isPending: isVerifyPending } =
		useVerifyRegister(accountNumber);
	const { mutateAsync: postRegister, isPending: isRegisterPending } = useRegister(accountNumber);
	const { mutateAsync: postLogin, isPending: isLoginPending } = useLogin(accountNumber);

	async function handleVerifyOtp(otpData: VerifyRegisterOtpCommand) {
		const verifyRegisterResult = await postVerifyRegister(otpData);
		if (verifyRegisterResult.error) {
			setBaranErrorsToForm(verifyRegisterResult, form, "verifyRegister");
			return;
		}

		form.setValue("register.password", form.getValues().login?.password);
		form.setValue("register.confirmPassword", form.getValues().login?.password);
		form.setValue("register.keyToken", verifyRegisterResult.response?.keyToken);
		const registerResult = await postRegister({
			...form.getValues().register,
			preservePreviousPassword: false
		});
		if (registerResult.error) {
			setBaranErrorsToForm(registerResult, form, "register");
			setBaranErrorsToForm(registerResult, form, "login");
			return;
		}

		const loginResult = await postLogin({
			...form.getValues().login!
		});
		if (loginResult.error) {
			setBaranErrorsToForm(loginResult, form, "login");
			return;
		}
	}

	return {
		mutateAsync: handleVerifyOtp,
		isPending: isLoginPending || isRegisterPending || isVerifyPending
	};
}
