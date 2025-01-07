import type { Mutators, SettingsStore } from "$/stores/settings";
import type { StateCreator } from "zustand";

type Environments = "pilot" | "test";

type State = {
	environment: Environments;
	/**
	 * derived from environment
	 */
	baseUrl: string;
};

type Actions = {
	setEnvironment: (environment: Environments) => void;
	resetEnvironment: () => void;
};

export type EnvironmentSlice = State & Actions;

const initial = { environment: "test" } as const;

export const createEnvironmentSlice: StateCreator<SettingsStore, Mutators, [], EnvironmentSlice> = (
	set,
	get
) => ({
	...initial,
	get baseUrl() {
		return get().environment === "pilot"
			? "https://dgbankmb-pilot.bki.ir"
			: "https://digitalbanking-tst.bki.ir";
	},
	setEnvironment(environment) {
		set((state) => {
			state.environment = environment;
		});
	},
	resetEnvironment: () => {
		set(initial);
	}
});
