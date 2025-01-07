import { createEnvironmentSlice, type EnvironmentSlice } from "$/features/environment";
import { createLoginSlice, type LoginSlice } from "$/features/login";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Actions = {
	reset: () => void;
};
export type SettingsStore = EnvironmentSlice & LoginSlice & Actions;
export type Mutators = [["zustand/persist", unknown], ["zustand/immer", never]];

export const useSettingsStore = create<SettingsStore & Actions>()(
	persist(
		immer((set, get, ...params) => ({
			...createLoginSlice(set, get, ...params),
			...createEnvironmentSlice(set, get, ...params),
			reset() {
				get().resetEnvironment();
				get().resetUser();
			}
		})),
		{
			name: "playground-settings"
		}
	)
);
