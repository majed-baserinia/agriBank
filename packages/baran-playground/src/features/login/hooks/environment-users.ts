import { useAppStore } from "$/stores";

export function useCurrentEnvironmentUsers() {
	const store = useAppStore();
	return store.users[store.environment];
}

export function useCurrentEnvironmentActiveUser() {
	const store = useAppStore();
	return store.users.activatedUserAccountNumber
		? store.users[store.environment].get(store.users.activatedUserAccountNumber)
		: undefined;
}
