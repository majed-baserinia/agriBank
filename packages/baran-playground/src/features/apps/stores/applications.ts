import type { AppStore, Mutators } from "$/stores/types";
import type { StateCreator } from "zustand";

export type Application = {
	title: string;
	url: string;
	queryParams?: string;
};

type State = {
	applications: {
		selectedApplicationTitle?: string;
		apps: Application[];
	};
};

type Actions = {
	addApplication: (environment: Application) => void;
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
			state.applications.apps.push(app);
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
