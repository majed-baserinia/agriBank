import { InputAdapter } from "$components/InputAdapter";
import { ButtonAdapter } from "$lib/components/ButtonAdapter";
import { CountDownTimer, useCountDownTimer } from "$lib/components/CountDownTimer";
import { pushAlert } from "$lib/stores/alerts";
import { usePostMessage } from "@agribank/post-message";
import CachedIcon from "@mui/icons-material/Cached";
import { Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Props } from "./types";

export function Otp({
	onSendSmsClick,
	sendOnLoad,
	onChange,
	agriInputProps,
	alertType,
	alertMessage = "",
	label,
	variant = "refresh-icon",
	type = "text",
	security = false,
	dir = "rtl"
}: Props) {
	const { t } = useTranslation("base");

	const [maxLength, setMaxLength] = useState(8);
	const [value, setValue] = useState("");
	const [isResendDisabled, setIsResendDisabled] = useState(false);
	const [hasSentSmsAtLeastOnce, setHasSentSmsAtLeastOnce] = useState(false);
	const { countDownTimer, setCountDownTimer, isTimerCounting } = useCountDownTimer({
		initialValue: -1,
		onCountDownEnded: () => {
			setIsResendDisabled(false);
		}
	});
	const { send: sendPostMessage } = usePostMessage({
		message: (otpLength: string) => {
			return { type: "GetOTP", OTPLen: otpLength, ReadMode: "UserConsent" } as const;
		},
		callback: (e) => {
			if (e.data.type !== "ResOTP") {
				return;
			}
			setValue(e.data.OTP);
			onChange(e.data.OTP);
		}
	});

	async function sendSms() {
		setHasSentSmsAtLeastOnce(true);
		setIsResendDisabled(true);

		const result = await onSendSmsClick();

		if (typeof result === "boolean") {
			setIsResendDisabled(false);
			return;
		}

		const maxLength = result.maxLength ?? 8;
		sendPostMessage(maxLength.toString());

		setCountDownTimer(result.timer ?? 120);
		setMaxLength(maxLength);

		if (alertMessage) {
			pushAlert({
				messageText: alertMessage,
				type: alertType?.type ?? "info",
				confirmButtonText: t("i-understand", { ns: "base" }),
				hasConfirmAction: true
			});
		}
	}

	useEffect(() => {
		if (!sendOnLoad) {
			return;
		}
		void sendSms();
	}, []);

	return (
		<Grid2
			display={"flex"}
			flexDirection={variant === "send-button" ? "row" : "column"}
			gap={5}
			width={"100%"}
		>
			<InputAdapter
				label={label ?? t("otp")}
				onChange={(value) => {
					setValue(value);
					onChange?.(value);
				}}
				defaultValue={value}
				maxLength={maxLength}
				type={type}
				dir={dir}
				security={security}
				{...agriInputProps}
				sx={{
					"& input": {
						letterSpacing: "10px"
					},
					...agriInputProps?.sx
				}}
			/>
			<Grid2
				container
				flexDirection={variant === "send-button" ? "row" : "row-reverse"}
				justifyContent={variant === "send-button" ? "flex-start" : "space-between"}
				alignItems={"center"}
				gap={5}
				sx={{
					minWidth: "96px"
				}}
			>
				{variant === "send-button" ? (
					<ButtonAdapter
						onClick={sendSms}
						disabled={isResendDisabled}
						muiButtonProps={{
							sx: {
								height: 56,
								minHeight: 56,
								padding: "10px",
								minWidth: "100%",
								marginBottom: "auto"
							}
						}}
						variant="outlined"
					>
						{t("get-otp")}
					</ButtonAdapter>
				) : (
					<ButtonAdapter
						onClick={sendSms}
						disabled={isResendDisabled}
						endIcon={<CachedIcon />}
						muiButtonProps={{
							sx: {
								height: 56,
								minHeight: 56,
								direction: "rtl",
							},
						}}
					>
						{hasSentSmsAtLeastOnce ? t("xsend-again", { xsend: t("send") }) : t("send")}
					</ButtonAdapter>
				)}
				<Grid2
					container
					flexDirection={variant === "send-button" ? "column" : "row"}
					paddingLeft={5}
					gap={variant === "send-button" ? 0 : 10}
				>
					{isTimerCounting && (
						<>
							<Typography variant="bodySm">{t("remaining-time")}</Typography>
							<CountDownTimer
								timerInSeconds={countDownTimer}
								isTimerCounting={isTimerCounting}
							/>
						</>
					)}
				</Grid2>
			</Grid2>
		</Grid2>
	);
}
