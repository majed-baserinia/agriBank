import { Typography, useTheme } from "@mui/material";

export type Props = {
	isTimerCounting: boolean;
	timerInSeconds: number | undefined;
};

/**
 * use with `useCountDownTimer` hook
 */
export const CountDownTimer = ({ timerInSeconds, isTimerCounting }: Props) => {
	const theme = useTheme();
	return (
		<span
			className={`px-2 ${!isTimerCounting ? "hidden" : ""}`}
			style={{ color: theme.palette.text.secondary }}
		>
			<Typography variant="bodySm">{beautifyTime(timerInSeconds ?? 0)}</Typography>
		</span>
	);
};

const beautifyTime = (time: number): string => {
	let minutes = Math.floor(time / 60).toString();
	let seconds = Math.floor(time % 60).toString();

	if (seconds.length == 1) {
		seconds = "0" + seconds;
	}

	if (minutes.length == 1) {
		minutes = "0" + minutes;
	}

	return `${minutes}:${seconds}`;
};
