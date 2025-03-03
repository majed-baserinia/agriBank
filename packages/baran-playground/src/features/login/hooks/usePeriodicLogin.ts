import { useCurrentEnvironmentActiveUser, useRefreshLogin } from "$/features/login";
import { useNavigate } from "@tanstack/react-router";
import { enqueueSnackbar } from "notistack";
import { useRef, type RefObject } from "react";

type LoginRequestState = { lastUpdateUtc: number } & (
	| {
			state: "pending" | "not-started" | "error";
			data: null;
	  }
	| {
			state: "done";
			data: Awaited<ReturnType<ReturnType<typeof useRefreshLogin>["mutateAsync"]>> | undefined;
	  }
);

type LoginParams = {
	user: ReturnType<typeof useCurrentEnvironmentActiveUser>;
	refreshLogin: ReturnType<typeof useRefreshLogin>;
	loginState: RefObject<LoginRequestState>;
	navigate: ReturnType<typeof useNavigate>;
};

export function usePeriodicLogin() {
	const loginState = useRef<LoginRequestState>(createLoginStatus("not-started"));
	const refreshLogin = useRefreshLogin();
	const user = useCurrentEnvironmentActiveUser();
	const navigate = useNavigate();

	async function loginAsync() {
		if (loginState.current.state === "pending" || loginState.current.state === "error") {
			return;
		}

		if (
			loginState.current.state === "done" &&
			Date.now() - loginState.current.lastUpdateUtc / 1000 < 30
		) {
			return;
		}

		await handleLoginRequest({
			user,
			refreshLogin,
			loginState,
			navigate
		});

		return loginState.current;
	}

	return loginAsync;
}

function isNoAuthUser(user: ReturnType<typeof useCurrentEnvironmentActiveUser>) {
	return user?.input.login?.username === "-" && user?.input.login?.password === "-";
}

async function handleLoginRequest({ user, loginState, refreshLogin, navigate }: LoginParams) {
	if (isNoAuthUser(user)) {
		loginState.current = createLoginStatus("done");
		return;
	}

	if (!user?.input.login?.username || !user.input.login?.password) {
		enqueueSnackbar({
			message: "no active users with username/password exists for the selected environment!",
			variant: "error"
		});
		await navigate({
			to: "/playground/login"
		});

		loginState.current = createLoginStatus("error");
		return;
	}

	loginState.current = createLoginStatus("pending");
	const data = await refreshLogin.mutateAsync();

	if (data?.error) {
		loginState.current = createLoginStatus("error");
		return;
	}

	loginState.current = createLoginStatus("done", data);
	return;
}

function createLoginStatus(
	state: LoginRequestState["state"],
	data?: Extract<LoginRequestState, { state: "done" }>["data"]
): LoginRequestState {
	if (state === "done") {
		return {
			state,
			data,
			lastUpdateUtc: Date.now()
		};
	}

	return {
		state,
		data: null,
		lastUpdateUtc: Date.now()
	};
}
