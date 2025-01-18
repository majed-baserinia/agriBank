import type { AuthSlice } from "$lib/stores/auth/types";
import type { SettingsSlice } from "$lib/stores/settings/types";

export type Mutators = [["zustand/persist", unknown], ["zustand/immer", never]];
export type AppStore = SettingsSlice & AuthSlice;
