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
				muiTextFieldProps={{
					inputProps: { maxLength: maxLength }
				}}
				isRequired
				label={label}
				onChange={(value) => onChange(value)}
				type="number"
				error={error}
				helperText={helperText}
				defaultValue={defaultValue}
			/>

			<Grid
				container
				alignItems={"baseline"}
				gap={8}
				sx={{
					marginTop: "8px"
				}}
			>
				<Typography
					variant="bodySm"
					hidden={!IsCountDownTimerCounting}
				>
					<Grid container>
						{t("timer")}
						<CountDownTimer
							timerInSeconds={timerInSeconds}
							onCountDownStarted={() => {
								setIsCountDownTimerCounting(true);
							}}
							onCountDownEnded={() => {
								setIsCountDownTimerCounting(false);
							}}
						/>
					</Grid>
				</Typography>
				<ButtonAdapter
					size="small"
					onClick={handleResend}
					disabled={IsCountDownTimerCounting}
					endIcon={
						<SvgToIcon
							icon={refreshIcon}
							alt="refresh"
						/>
					}
				>
					{t("sendAgain")}
				</ButtonAdapter>
			</Grid>
		</>
	);
}
