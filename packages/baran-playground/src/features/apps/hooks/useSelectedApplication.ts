import { useAppStore } from "$/stores";
import { findApp } from "../utils/findApp";

export function useSelectedApplication() {
	const store = useAppStore();
	return findApp(store.applications.apps, store.applications.selectedApplicationTitle);
}
