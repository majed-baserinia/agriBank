import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createAuthSlice } from "./auth/auth";
import { createSettingsSlice } from "./settings/settings";
import type { AppStore, Mutators } from "./types";

export const useIgniteStore = create<AppStore, Mutators>(
	persist(
		immer((...opts) => ({
			...createSettingsSlice(...opts),
			...createAuthSlice(...opts)
		})),
		{
			name: "ignite-settings-store",
			storage: createJSONStorage(() => sessionStorage),
			partialize(state) {
				return {
					auth: state.auth
				};
			}
		}
	)
);
