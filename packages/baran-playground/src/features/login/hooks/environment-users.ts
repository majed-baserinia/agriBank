import { useAppStore } from "$/stores";

export function useCurrentEnvironmentUsers() {
	const store = useAppStore();
	return store.users[store.environment];
}

export function useCurrentEnvironmentActiveUser() {
	const store = useAppStore();
	return store.users.activatedUserKey
		? store.users[store.environment].get(store.users.activatedUserKey)
		: undefined;
}
