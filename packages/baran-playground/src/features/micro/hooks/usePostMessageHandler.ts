import type { Application } from "$/features/apps";
import { useCurrentEnvironmentUser, useRefreshLogin } from "$/features/login";
import type { PostMessageOutputSubType, PostMessageTypes } from "@agribank/post-message";
import { useNavigate } from "@tanstack/react-router";
import { enqueueSnackbar } from "notistack";
import { type RefObject, useCallback } from "react";

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
	const user = useCurrentEnvironmentUser();

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
					if (refreshLogin.isPending || refreshLogin.data?.response) {
						return;
					}

					if (!user.output?.login?.idToken) {
						enqueueSnackbar({
							message: "invalid token for the selected environment, please login first",
							variant: "error"
						});
						await navigate({
							to: "/playground/login"
						});
						return;
					}
					const data = await refreshLogin.mutateAsync();
					if (data?.error) {
						return;
					}

					iframe.current?.contentWindow?.postMessage(
						{
							type: "initiateIFrame",
							data: {
								idToken: data?.response?.idToken,
								refreshToken: data?.response?.refreshToken,
								osType: "3",
								osVersion: "2.5"
							} satisfies PostMessageOutputSubType<"iFrameReady", "initiateIFrame">
						},
						event.origin
					);
				}
			}
		},
		[app.url, iframe, navigate, refreshLogin, updateLastAliveTime, user.output?.login?.idToken]
	);
	return handler;
}
