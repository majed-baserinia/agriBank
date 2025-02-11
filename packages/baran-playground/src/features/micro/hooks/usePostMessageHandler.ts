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

type LoginRequestState = "pending" | "stale" | "error" | "done";

function isNoAuthUser(user: ReturnType<typeof useCurrentEnvironmentActiveUser>) {
	return user?.input.login?.username === "-" && user?.input.login?.password === "-";
}

export function usePostMessageHandler({
	iframe,
	app,
	updateLastAliveTime
}: PostMessageHandlerOptions) {
	const navigate = useNavigate();

	const refreshLogin = useRefreshLogin();
	const user = useCurrentEnvironmentActiveUser();
	const loginRequestState = useRef<LoginRequestState>("stale");

	const handler = useCallback(
		async (event: MessageEvent<{ type: PostMessageTypes["type"] | (string & {}) }>) => {
			if (new URL(app.url).origin !== event.origin) {
				return;
			}
			console.info("RECEIVED POSTMESSAGE", event);
			switch (event.data.type) {
				case "GetOTP":
					enqueueSnackbar({
						message: "requested for otp (sending dummy sms)",
						variant: "warning",
						autoHideDuration: 200
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
					if (loginRequestState.current !== "stale") {
						return;
					}

					const result = await handleLoginRequest({
						loginRequestState,
						navigate: navigate,
						refreshLogin: refreshLogin,
						user: user
					});

					if (result.status === "error") {
						return;
					}

					sendPostMessage(
						iframe.current,
						{
							type: "initiateIFrame",
							data: {
								idToken: result.data?.response?.idToken,
								refreshToken: result.data?.response?.refreshToken,
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

async function handleLoginRequest({
	user,
	loginRequestState,
	refreshLogin,
	navigate
}: {
	user: ReturnType<typeof useCurrentEnvironmentActiveUser>;
	refreshLogin: ReturnType<typeof useRefreshLogin>;
	loginRequestState: RefObject<LoginRequestState>;
	navigate: ReturnType<typeof useNavigate>;
}) {
	if (isNoAuthUser(user)) {
		loginRequestState.current = "done";
		return {
			status: "no-auth"
		} as const;
	}
	if (!user?.input.login?.username || !user.input.login?.password) {
		enqueueSnackbar({
			message: "no active users with username/password exists for the selected environment!",
			variant: "error"
		});
		await navigate({
			to: "/playground/login"
		});
		return {
			status: "error"
		} as const;
	}
	loginRequestState.current = "pending";
	const data = await refreshLogin.mutateAsync();
	if (data?.error) {
		loginRequestState.current = "error";
		return {
			status: "error"
		} as const;
	}
	loginRequestState.current = "done";
	return {
		status: "success",
		data
	} as const;
}
