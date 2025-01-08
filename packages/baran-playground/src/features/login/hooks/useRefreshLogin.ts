import { useCallback } from "react";
import { useLogin } from "../services/login";
import { useCurrentEnvironmentUser } from "./useCurrentEnvironmentUser";

export function useRefreshLogin() {
	const user = useCurrentEnvironmentUser();
	const username = user.input?.login?.username;
	const password = user.input?.login?.password;
	const { mutate, mutateAsync: _, ...rest } = useLogin();

	const login = useCallback(() => {
		if (!username || !password) {
			return;
		}

		return mutate({ username, password });
	}, [username, password, mutate]);

	return { mutate: login, ...rest };
}
