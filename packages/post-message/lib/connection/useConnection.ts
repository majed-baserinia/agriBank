import { useMultipleInitRequest, type MultipleInitRequestEvents } from "$lib/init";
import type { PostMessageOutput, PostMessageType } from "$lib/utils";
import { useEffect, useState } from "react";

type InitiateIFrameOutputType = PostMessageType<"iFrameReady">["output"];

export type ConnectionProps<TData extends InitiateIFrameOutputType> = {
	needsInitData: boolean;
	onIframeInitiated?: (data: Extract<TData, { type: "initiateIFrame" }>["data"]) => void;
	onGobackPressed?: () => void;
} & MultipleInitRequestEvents;

export function useConnection<TData extends InitiateIFrameOutputType = InitiateIFrameOutputType>({
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

	const onReceivePostMessage = <TType extends PostMessageOutput<"iFrameReady">["type"]>(
		event: MessageEvent<{
			type: TType;
			data: Extract<TData, { type: TType }>["data"];
		}>
	) => {
		const type = event.data.type;

		if (type === "initiateIFrame") {
			initiateIFrameHandler(event.data.data);
		}
		if (type === "goback") {
			onGobackPressed?.();
		}
	};

	const initiateIFrameHandler = (data: Extract<TData, { type: "initiateIFrame" }>["data"]) => {
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
