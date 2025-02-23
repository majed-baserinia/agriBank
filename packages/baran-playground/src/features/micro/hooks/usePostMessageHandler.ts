import type { Application } from "$/features/apps";
import { convert } from "$/features/environment";
import type { usePeriodicLogin } from "$/features/login";
import { useAppStore } from "$/stores";
import type { PostMessageOutputSubType, PostMessageTypes } from "@agribank/post-message";
import { enqueueSnackbar } from "notistack";
import { type RefObject } from "react";

export type PostMessageHandlerOptions = {
	iframe: RefObject<HTMLIFrameElement | null>;
	app: Application;
	updateLastAliveTime: () => void;
	login: ReturnType<typeof usePeriodicLogin>;
};

export function usePostMessageHandler({
	iframe,
	app,
	updateLastAliveTime,
	login
}: PostMessageHandlerOptions) {
	const handler = async (
		event: MessageEvent<{ type: PostMessageTypes["type"] | (string & {}) }>
	) => {
		if (new URL(app.url).origin !== event.origin) {
			return;
		}

		console.info("RECEIVED POSTMESSAGE", event);
		switch (event.data.type) {
			case "GetOTP":
				enqueueSnackbar({
					message: "requested for otp (sending dummy sms)",
					variant: "warning"
				});
				sendPostMessage(
					iframe.current,
					{
						type: "ResOTP",
						OTP: "12345678"
					},
					event.origin
				);
				return;
			case "isFinishedBack":
				enqueueSnackbar({
					message: "cannot go back anymore (the `isFinishedBack` message is received)",
					variant: "warning"
				});
				return;
			case "iFrameStillAlive":
				updateLastAliveTime();
				return;
			case "iFrameReady": {
				const result = await login();

				if (result?.state !== "done") {
					return;
				}

				sendPostMessage(
					iframe.current,
					{
						type: "initiateIFrame",
						data: {
							idToken: result?.data?.response?.idToken,
							refreshToken: result?.data?.response?.refreshToken,
							osType: "3",
							config: {
								baseApiUrl: convert(useAppStore.getState().environment.active)
							}
						} satisfies PostMessageOutputSubType<"iFrameReady", "initiateIFrame">["data"]
					},
					event.origin
				);
			}
		}
	};

	return handler;
}

function sendPostMessage(iframe: HTMLIFrameElement | null, data: unknown, origin: string) {
	if (!iframe || !iframe.contentWindow) {
		console.warn("sending postMessage failed because Iframe is not loaded yet");
		return;
	}
	iframe.contentWindow.postMessage(data, origin);
	console.log("SENT POSTMESSAGE", data);
}
