import { createApplicationsSlice } from "$/features/apps";
// TODO: i cant find the circular dependency
// eslint-disable-next-line no-restricted-imports
import { createEnvironmentSlice } from "$/features/environment/stores/index";
import { createLoginSlice } from "$/features/login";
import { createMicroSlice } from "$/features/micro";
import { createStorage } from "$/stores/storage";
import type { AppStore } from "$/stores/types";
import { enableMapSet } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

enableMapSet();
export const useAppStore = create<AppStore>()(
	persist(
		immer((set, get, ...params) => ({
			...createLoginSlice(set, get, ...params),
			...createEnvironmentSlice(set, get, ...params),
			...createApplicationsSlice(set, get, ...params),
			...createMicroSlice(set, get, ...params),
			reset() {
				get().resetEnvironment();
				get().resetUsers();
			}
		})),
		{
			storage: createStorage(),
			name: "playground-settings"
		}
	)
);
