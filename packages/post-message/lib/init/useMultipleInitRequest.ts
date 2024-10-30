import { closeApp, sendPostMessage } from "$lib/utils";
import { useEffect, useRef } from "react";

export type MultipleInitRequestEvents = {
	/**
	 * if returns false, then prevents closing the app and does whatever you ask it to do
	 * otherwise closes the app as soon as its done processing this callback
	 */
	onInitializationFailed?: (closeApp: () => void) => boolean | undefined;
};

export type MultipleInitRequestProps = {
	needsInitData: boolean;
	received: boolean;
	delay: number;
	duration: number;
} & MultipleInitRequestEvents;

export function useMultipleInitRequest({
	needsInitData,
	received,
	delay,
	duration,
	onInitializationFailed
}: MultipleInitRequestProps) {
	const intervalRef = useRef<number | null>(null);
	const counter = useRef(0);

	useEffect(() => {
		if (!needsInitData) return;

		if (received) {
			clearInterval(intervalRef.current!);
			return;
		}

		intervalRef.current = setInterval(() => {
			if (!received && counter.current === duration / delay) {
				clearInterval(intervalRef.current!);
				const autoCloseApp = onInitializationFailed?.(closeApp);
				if (autoCloseApp !== false) {
					closeApp();
				}
			}
			sendPostMessage("iFrameReady", "Hi Parent");
			counter.current++;
		}, delay);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [received, needsInitData]);
}
