import type { AppStore, Mutators } from "$lib/stores/types";
import type { StateCreator } from "zustand";
import type { AuthSlice, AuthState } from "./types";

const initial: AuthState = {
	auth: {
		idToken: undefined,
		refreshToken: undefined
	}
};

export const createAuthSlice: StateCreator<AppStore, Mutators, [], AuthSlice> = (set) => ({
	auth: initial,
	clearAuth: () => set(initial),
	setAuth(auth) {
		set((state) => {
			state.auth = auth;
		});
	}
});
