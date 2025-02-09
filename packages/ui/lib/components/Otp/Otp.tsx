import { InputAdapter } from "$components/InputAdapter";
import { ButtonAdapter } from "$lib/components/ButtonAdapter";
import { CountDownTimer, useCountDownTimer } from "$lib/components/CountDownTimer";
import { usePostMessage } from "@agribank/post-message";
import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import { Grid2, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Props } from "./types";

export function Otp({ handleSend, sendOnLoad, onChange, agriInputProps }: Props) {
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

		const result = await handleSend();

		if (typeof result === "boolean") {
			setIsResendDisabled(false);
			return;
		}

		const maxLength = result.maxLength ?? 8;
		sendPostMessage(maxLength.toString());

		setCountDownTimer(result.timer ?? 120);
		setMaxLength(maxLength);
	}

	useEffect(() => {
		if (!sendOnLoad) {
			return;
		}
		void sendSms();
	}, []);

	return (
		<Grid2>
			<InputAdapter
				label={t("activation-code")}
				onChange={(value) => {
					setValue(value);
					onChange?.(value);
				}}
				type="number"
				defaultValue={value}
				maxLength={maxLength}
				endIcon={
					value.length > 0 && (
						<IconButton
							aria-label="clear otp"
							onClick={() => {
								setValue("");
							}}
						>
							<CloseIcon />
						</IconButton>
					)
				}
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
				justifyContent={"space-between"}
				alignItems={"center"}
				sx={{
					marginTop: 2,
					width: "100%"
				}}
			>
				<Grid2
					container
					flexDirection={"row"}
					gap={10}
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
				<ButtonAdapter
					onClick={sendSms}
					disabled={isResendDisabled}
					endIcon={<CachedIcon />}
				>
					{hasSentSmsAtLeastOnce ? t("xsend-again", { xsend: t("send") }) : t("send")}
				</ButtonAdapter>
			</Grid2>
		</Grid2>
	);
}
