import type { SliceCreator } from "$/stores/types";
import type { Environments } from "../utils/environment-to-url";

type State = {
	environment: {
		active: Environments;
		customUrl?: string;
	};
};

type Actions = {
	setEnvironment: (environment: Environments) => void;
	resetEnvironment: () => void;
	setCustomEnvironmentUrl: (url: string) => void;
};

export type EnvironmentSlice = State & Actions;

const initial: State = { environment: { active: "test" } };

export const createEnvironmentSlice: SliceCreator<EnvironmentSlice> = (set) => ({
	...initial,
	setCustomEnvironmentUrl(url) {
		set((state) => {
			state.environment.customUrl = url;
		});
	},
	setEnvironment(environment) {
		set((state) => {
			state.environment.active = environment;
		});
	},
	resetEnvironment() {
		set(initial);
	}
});
