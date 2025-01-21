import type { SliceCreator } from "$/stores/types";
import type { Environments } from "../utils/environment-to-url";

type State = {
	environment: Environments;
};

type Actions = {
	setEnvironment: (environment: Environments) => void;
	resetEnvironment: () => void;
};

export type EnvironmentSlice = State & Actions;

const initial: State = { environment: "test" };

export const createEnvironmentSlice: SliceCreator<EnvironmentSlice> = (set) => ({
	...initial,
	setEnvironment(environment) {
		set((state) => {
			state.environment = environment;
		});
	},
	resetEnvironment() {
		set(initial);
	}
});
