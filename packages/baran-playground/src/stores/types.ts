import type { ApplicationSlice } from "$/features/apps/stores/applications";
import type { EnvironmentSlice } from "$/features/environment";
import type { LoginSlice } from "$/features/login";

export type CustomAppActions = {
	reset: () => void;
};
export type AppStore = EnvironmentSlice & LoginSlice & ApplicationSlice & CustomAppActions;
export type Mutators = [["zustand/persist", unknown], ["zustand/immer", never]];
