import { useAppStore } from "$/stores";
import { useCallback } from "react";
import { type LoginRequest, useLogin } from "../services/login";
import { useCurrentEnvironmentActiveUser } from "./environment-users";

function useMemoizedLogin<T>(
	{ username, password }: Partial<LoginRequest>,
	mutate: (params: LoginRequest) => T
) {
	const environment = useAppStore((s) => s.environment.active);
	return useCallback(() => {
		if (!username || !password) {
			return;
		}

		return mutate({ username, password });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username, password, environment, mutate]);
}

export function useRefreshLogin() {
	const user = useCurrentEnvironmentActiveUser();
	const { mutate, mutateAsync, ...rest } = useLogin(user?.input.preRegister?.accOrCifNum ?? "");

	const username = user?.input?.login?.username;
	const password = user?.input?.login?.password;

	const loginSync = useMemoizedLogin({ username, password }, mutate);
	const loginAsync = useMemoizedLogin({ username, password }, mutateAsync);

	return { mutate: loginSync, mutateAsync: loginAsync, ...rest };
}
