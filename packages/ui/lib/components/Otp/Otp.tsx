import refreshIcon from "$assets/icons/refresh-alert.svg";
import { ButtonAdapter } from "$components/ButtonAdapter";
import { CountDownTimer } from "$components/CountDownTimer";
import { InputAdapter } from "$components/InputAdapter";
import { SvgToIcon } from "$components/SvgToIcon";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { Props } from "./types";

export function Otp(props: Props) {
	const {
		maxLength = 8,
		onChange,
		helperText,
		error,
		label,
		handleResend,
		timerInSeconds,
		defaultValue
	} = props;
	const { t } = useTranslation("base");
	const [IsCountDownTimerCounting, setIsCountDownTimerCounting] = useState<boolean>();

	return (
		<>
			<InputAdapter
				defaultValue={defaultValue}
				error={error}
				helperText={helperText}
				isRequired
				label={label}
				muiTextFieldProps={{
					inputProps: { maxLength: maxLength }
				}}
				onChange={(value) => onChange(value)}
				type="number"
			/>
			<Grid
				container
				sx={{
					alignItems: "baseline",
					gap: 8,
					marginTop: "8px"
				}}
			>
				<Typography
					hidden={!IsCountDownTimerCounting}
					variant="bodySm"
				>
					<Grid container>
						{t("remaining-time")}
						<CountDownTimer
							onCountDownEnded={() => {
								setIsCountDownTimerCounting(false);
							}}
							onCountDownStarted={() => {
								setIsCountDownTimerCounting(true);
							}}
							timerInSeconds={timerInSeconds}
						/>
					</Grid>
				</Typography>
				<ButtonAdapter
					disabled={IsCountDownTimerCounting}
					endIcon={
						<SvgToIcon
							alt="refresh"
							icon={refreshIcon}
						/>
					}
					onClick={handleResend}
					size="small"
				>
					{t("send-again")}
				</ButtonAdapter>
			</Grid>
		</>
	);
}
