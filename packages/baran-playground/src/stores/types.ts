import type { ApplicationSlice } from "$/features/apps";
import type { EnvironmentSlice } from "$/features/environment";
import type { LoginSlice } from "$/features/login";
import type { MicroSlice } from "$/features/micro";

export type CustomAppActions = {
	reset: () => void;
};
export type AppStore = EnvironmentSlice &
	LoginSlice &
	ApplicationSlice &
	MicroSlice &
	CustomAppActions;
export type Mutators = [["zustand/persist", unknown], ["zustand/immer", never]];
