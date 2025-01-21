import type { ApplicationSlice } from "$/features/apps";
import type { EnvironmentSlice } from "$/features/environment";
import type { LoginSlice } from "$/features/login";
import type { MicroSlice } from "$/features/micro";
import type { StateCreator } from "zustand";

export type CustomAppActions = {
	reset: () => void;
};
export type AppStore = EnvironmentSlice &
	LoginSlice &
	ApplicationSlice &
	MicroSlice &
	CustomAppActions;
export type InMutator = [["zustand/immer", never]];
export type OutMutator = [["zustand/persist", Partial<AppStore>]];
export type SliceCreator<T> = StateCreator<AppStore, InMutator, OutMutator, T>;
