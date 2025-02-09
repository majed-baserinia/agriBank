import type { Application } from "$/features/apps";
import { type PostMessageTypes, usePostMessageRaw } from "@agribank/post-message";
import { enqueueSnackbar } from "notistack";
import { type RefObject, useEffect, useRef } from "react";
import { usePostMessageHandler } from "./usePostMessageHandler";

type Props = {
	iframe: RefObject<HTMLIFrameElement | null>;
	app: Application;
};

export function useInit({ iframe, app }: Props) {
	const lastTimeIframeStillAliveWasSent = useRef<number | null>(null);

	const postMessageHandler = usePostMessageHandler({
		iframe,
		app,
		updateLastAliveTime: () => (lastTimeIframeStillAliveWasSent.current = new Date().getTime())
	});

	usePostMessageRaw<never, { type: PostMessageTypes["type"] | (string & {}) }>({
		target: window,
		callback: postMessageHandler
	});

	useEffect(() => {
		const firstTime = new Date().getTime();
		const intervalMs = 50_000;
		const intervalId = setInterval(() => {
			if (!lastTimeIframeStillAliveWasSent.current && firstTime > intervalMs) {
				enqueueSnackbar({
					message: `hasn't received the first \`iFrameStillAlive\` event for more than ${intervalMs}ms`
				});
			}
			if (
				lastTimeIframeStillAliveWasSent.current &&
				new Date().getTime() - lastTimeIframeStillAliveWasSent.current > intervalMs
			) {
				enqueueSnackbar({
					message: `hasn't received any \`iFrameStillAlive\` events for more than ${intervalMs}ms`,
					autoHideDuration: 200
				});
			}
		}, intervalMs);
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		const handlePopState = () => {
			console.info("SENDING POPSTATE");

			if (!iframe) {
				return;
			}

			iframe.current?.contentWindow?.postMessage(
				{ type: "goback", data: "" },
				iframe.current.contentWindow.location.origin
			);
		};

		// Add event listener for browser back button
		window.addEventListener("popstate", handlePopState);

		return () => {
			// Clean up the event listener when the component is unmounted
			window.removeEventListener("popstate", handlePopState);
		};
	}, [iframe]);
}
