import { useMultipleInitRequest, type MultipleInitRequestEvents } from "$lib/init";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export type ConnectionProps<TData> = {
	onIframeInitiated?: (data: TData) => void;
	onGobackPressed?: () => void;
} & MultipleInitRequestEvents;

export function useConnection<TData>({
	onIframeInitiated,
	onGobackPressed,
	onInitializationFailed
}: ConnectionProps<TData>) {
	const search = useSearch({ strict: false }) as { Auth?: string };
	//we are checking the query string for 'Auth', in all situations it is true except the time that it is false
	const auth = search.Auth;
	const needsInitData = auth === "false" ? false : true;
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
