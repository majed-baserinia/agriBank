import { useMultipleInitRequest, type MultipleInitRequestEvents } from "$lib/init";
import { useEffect, useState } from "react";

export type ConnectionProps<TData> = {
	needsInitData: boolean;
	onIframeInitiated?: (data: TData) => void;
	onGobackPressed?: () => void;
} & MultipleInitRequestEvents;

export function useConnection<TData>({
	needsInitData,
	onIframeInitiated,
	onGobackPressed,
	onInitializationFailed
}: ConnectionProps<TData>) {
	const [receivedInitPostMessage, setReceivedInitPostMessage] = useState(false);

	useMultipleInitRequest({
		needsInitData,
		received: receivedInitPostMessage,
		delay: 500,
		duration: 5000,
		onInitializationFailed: onInitializationFailed
	});

	const onReceivePostMessage = (event: MessageEvent<{ type: string; data: TData }>) => {
		const type = event.data.type;

		if (type === "initiateIFrame") {
			initiateIFrameHandler(event.data.data);
		}
		if (type === "goback") {
			onGobackPressed?.();
		}
	};

	const initiateIFrameHandler = (data: TData) => {
		setReceivedInitPostMessage(true);
		onIframeInitiated?.(data);
	};

	useEffect(() => {
		window.addEventListener("message", onReceivePostMessage);

		// Clean up the event listener
		return () => {
			window.removeEventListener("message", onReceivePostMessage);
		};
	}, []);

	return { readyToLoad: receivedInitPostMessage };
}
