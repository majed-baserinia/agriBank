import { useAppStore } from "$/stores";

export function useCurrentEnvironmentUsers() {
	const store = useAppStore();
	return store.users[store.environment.active];
}

export function useCurrentEnvironmentActiveUser() {
	const store = useAppStore();
	return store.users.activatedUserKey
		? store.users[store.environment.active].get(store.users.activatedUserKey)
		: undefined;
}
