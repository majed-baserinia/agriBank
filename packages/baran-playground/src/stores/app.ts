import { createApplicationsSlice } from "$/features/apps/stores/applications";
import { createEnvironmentSlice } from "$/features/environment/stores/index";
import { createLoginSlice } from "$/features/login/stores/index";
import { createMicroSlice } from "$/features/micro/stores/index";
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
