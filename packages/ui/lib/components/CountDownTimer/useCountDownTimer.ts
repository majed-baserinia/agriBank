import { useEffect, useRef, useState } from "react";

export type CountDownTimerProps = {
	/**
	 *  what timer should start with
	 */
	initialValue: number | undefined;
	/**
	 * when timer should stop counting down and clear the interval
	 */
	minTimerValue?: number;
	/**
	 * event fired when we clear the interval and stop counting
	 */
	onCountDownEnded?: () => void;
	/**
	 * event fired when countdown has started
	 */
	onCountDownStarted?: () => void;
};

export const useCountDownTimer = ({
	initialValue,
	minTimerValue = 0,
	onCountDownStarted,
	onCountDownEnded
}: CountDownTimerProps) => {
	const [countDownTimer, setCountDownTimer] = useState(initialValue ?? minTimerValue - 1);
	const intervalId = useRef<number | undefined>(undefined);

	useEffect(() => {
		createIntervalIfRequired();
		return () => clearIntervalIfRequired();
	}, [countDownTimer]);

	const createIntervalIfRequired = () => {
		if (countDownTimer < minTimerValue) {
			return;
		}

		// don't create the interval if we already have it
		if (intervalId.current !== undefined) {
			return;
		}

		onCountDownStarted?.();

		const createdIntervalId = setInterval(() => {
			setCountDownTimer((previousValue) => {
				return previousValue - 1;
			});
		}, 1000);

		intervalId.current = createdIntervalId;
	};

	const clearIntervalIfRequired = () => {
		if (countDownTimer > minTimerValue) {
			return;
		}

		if (intervalId.current == undefined) {
			return;
		}

		onCountDownEnded?.();

		clearInterval(intervalId.current);

		intervalId.current = undefined;
	};

	return {
		countDownTimer: countDownTimer,
		setCountDownTimer: setCountDownTimer,
		isTimerCounting: countDownTimer >= minTimerValue
	};
};
