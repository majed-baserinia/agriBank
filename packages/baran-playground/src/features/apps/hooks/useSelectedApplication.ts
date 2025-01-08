import { useAppStore } from "$/stores";

export function useSelectedApplication() {
	const store = useAppStore();
	return store.applications.apps.find(
		(app) => app.title === store.applications.selectedApplicationTitle
	);
}
