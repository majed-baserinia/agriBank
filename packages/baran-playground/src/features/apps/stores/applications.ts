import type { AppStore, Mutators } from "$/stores/types";
import { pushAlert } from "@agribank/ui/stores/alerts";
import type { StateCreator } from "zustand";
import { findApp } from "../utils";

export type Application = {
	title: string;
	url: string;
	searchParams?: string;
};

type State = {
	applications: {
		selectedApplicationTitle?: string;
		apps: Application[];
	};
};

type Actions = {
	addApplication: (app: Application) => void;
	updateApplication: (lastTitle: string, app: Application) => void;
	removeApplication: (title: string) => void;
	setSelectedApp: (app: { title: string }) => void;
	resetApplications: () => void;
};

export type ApplicationSlice = State & Actions;

const initial: State = { applications: { apps: [] } };

export const createApplicationsSlice: StateCreator<AppStore, Mutators, [], ApplicationSlice> = (
	set
) => ({
	...initial,
	setSelectedApp({ title }) {
		set((state) => {
			state.applications.selectedApplicationTitle = title;
		});
	},
	addApplication(app) {
		set((state) => {
			if (!isApplicationUnique(app.title, state.applications.apps)) {
				pushAlert({
					type: "error",
					messageText: "application already exists (title should be unique)"
				});
				return;
			}
			state.applications.apps.push(app);
		});
	},
	updateApplication(lastTitle, app) {
		set((state) => {
			if (lastTitle !== app.title && !isApplicationUnique(app.title, state.applications.apps)) {
				pushAlert({
					type: "error",
					messageText: "application already exists (title should be unique)"
				});
				return;
			}
			const appIndex = state.applications.apps.findIndex((app) => app.title === lastTitle);
			if (appIndex === -1) {
				pushAlert({
					type: "error",
					messageText: "application to edit not found"
				});
				return;
			}

			state.applications.apps[appIndex] = app;
		});
	},
	removeApplication(title) {
		set((state) => {
			state.applications.apps = state.applications.apps.filter((app) => app.title !== title);
		});
	},
	resetApplications() {
		set(initial);
	}
});

export function isApplicationUnique(title: string, apps: Application[]) {
	return findApp(apps, title) === undefined;
}
