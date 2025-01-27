import { useAppStore } from "$/stores";
import type { NavigateFn } from "@tanstack/react-router";
import type { Application } from "../stores";
import { findApp } from "./findApp";

export function createAppUrl(app: Application) {
	return `${app?.url}?${app?.searchParams ?? ""}`;
}

export async function navigateToActiveApplication(navigate: NavigateFn) {
	const state = useAppStore.getState();
	const env = state.environment.active;
	const app = findApp(state.applications.apps, state.applications.selectedApplicationTitle);
	await navigate({
		to: `/$environment/$app`,
		params: {
			app: app?.title ?? "undefined",
			environment: env
		}
	});
}
