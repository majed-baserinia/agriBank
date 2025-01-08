import { useAppStore } from "$/stores";

export function useCurrentEnvironmentUser() {
	const store = useAppStore();
	return store.user[store.environment];
}
