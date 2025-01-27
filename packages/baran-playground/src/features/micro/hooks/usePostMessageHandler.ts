import type { Application } from "$/features/apps";
import { convert } from "$/features/environment";
import { useCurrentEnvironmentActiveUser, useRefreshLogin } from "$/features/login";
import { useAppStore } from "$/stores";
import type { PostMessageOutputSubType, PostMessageTypes } from "@agribank/post-message";
import { useNavigate } from "@tanstack/react-router";
import { enqueueSnackbar } from "notistack";
import { type RefObject, useCallback, useRef } from "react";

type PostMessageHandlerOptions = {
	iframe: RefObject<HTMLIFrameElement | null>;
	app: Application;
	updateLastAliveTime: () => void;
};
export function usePostMessageHandler({
	iframe,
	app,
	updateLastAliveTime
}: PostMessageHandlerOptions) {
	const navigate = useNavigate();

	const refreshLogin = useRefreshLogin();
	const user = useCurrentEnvironmentActiveUser();
	const isHandlingLogin = useRef(false);

	const handler = useCallback(
		async (event: MessageEvent<{ type: PostMessageTypes["type"] | (string & {}) }>) => {
			if (new URL(app.url).origin !== event.origin) {
				return;
			}
			console.info("RECEIVED POSTMESSAGE", event);
			switch (event.data.type) {
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
					updateLastAliveTime();
					return;
				case "iFrameReady": {
					if (refreshLogin.isPending || refreshLogin.data?.response || isHandlingLogin.current) {
						return;
					}

					if (!user?.input.login?.username || !user.input.login?.password) {
						enqueueSnackbar({
							message:
								"no active users with username/password exists for the selected environment!",
							variant: "error"
						});
						await navigate({
							to: "/playground/login"
						});
						return;
					}
					isHandlingLogin.current = true;
					const data = await refreshLogin.mutateAsync();
					isHandlingLogin.current = false;
					if (data?.error) {
						return;
					}

					sendPostMessage(
						iframe.current,
						{
							type: "initiateIFrame",
							data: {
								idToken: data?.response?.idToken,
								refreshToken: data?.response?.refreshToken,
								osType: "3",
								config: {
									baseApiUrl: convert(useAppStore.getState().environment.active)
								}
							} satisfies PostMessageOutputSubType<"iFrameReady", "initiateIFrame">
						},
						event.origin
					);
				}
			}
		},
		[app.url, iframe, navigate, refreshLogin, updateLastAliveTime, user?.output?.login?.idToken]
	);
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
