import { useCurrentEnvironmentUser, useRefreshLogin } from "$/features/login";
import {
	PostMessageOutputSubType,
	type PostMessageTypes,
	usePostMessageRaw
} from "@agribank/post-message";
import { useNavigate } from "@tanstack/react-router";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef } from "react";

export function useInit(iframe: HTMLIFrameElement | null) {
	const navigate = useNavigate();
	const lastTimeIframeStillAliveWasSent = useRef<number | null>(null);

	const refreshLogin = useRefreshLogin();
	const user = useCurrentEnvironmentUser();

	usePostMessageRaw<never, { type: PostMessageTypes["type"] | (string & {}) }>({
		callback(e) {
			console.info("RECEIVED POSTMESSAGE", e);
			switch (e.data.type) {
				case "GetOTP":
					enqueueSnackbar({
						message: "requested for otp (not handled by micro at this moment)",
						variant: "warning"
					});
					return;
				case "isFinishedBack":
					enqueueSnackbar({
						message: "cannot go back anymore (the `isFinishedBack` message is received)",
						variant: "warning"
					});
					return;
				case "iFrameStillAlive":
					lastTimeIframeStillAliveWasSent.current = new Date().getTime();
					return;
				case "iFrameReady": {
					if (!user.output?.login?.idToken) {
						enqueueSnackbar({
							message: "invalid token for the selected environment, please login first",
							variant: "error"
						});
						void navigate({
							to: "/playground/login"
						});
						return;
					}
					const data = refreshLogin.mutate();
					iframe?.contentWindow?.postMessage(
						{
							type: "initiateIFrame",
							data: {
								idToken: data.idToken,
								refresToken: data.refreshToken,
								osType: "3"
							}
						} satisfies PostMessageOutputSubType<"iFrameReady", "initiateIFrame">,
						iframe.contentWindow.location.origin
					);
				}
			}
		}
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
					message: `hasn't received any \`iFrameStillAlive\` events for more than ${intervalMs}ms`
				});
			}
		}, intervalMs);
		return () => clearInterval(intervalId);
	});

	useEffect(() => {
		const handlePopState = () => {
			console.info("SENDING POPSTATE");

			if (!iframe) {
				return;
			}

			iframe.contentWindow?.postMessage(
				{ type: "goback", data: "" },
				iframe.contentWindow.location.origin
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
