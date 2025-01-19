import { createApplicationsSlice } from "$/features/apps";
// TODO: i cant find the circular dependency
// eslint-disable-next-line no-restricted-imports
import { createEnvironmentSlice } from "$/features/environment/stores/index";
import { createLoginSlice } from "$/features/login";
import { createMicroSlice } from "$/features/micro";
import type { AppStore, CustomAppActions, Mutators } from "$/stores/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useAppStore = create<AppStore & CustomAppActions, Mutators>(
	persist(
		immer((set, get, ...params) => ({
			...createLoginSlice(set, get, ...params),
			...createEnvironmentSlice(set, get, ...params),
			...createApplicationsSlice(set, get, ...params),
			...createMicroSlice(set, get, ...params),
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
