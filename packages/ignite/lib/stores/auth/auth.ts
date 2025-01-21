import type { SliceCreator } from "$lib/stores/types";
import type { AuthSlice, AuthState } from "./types";

const initial: AuthState = {
	auth: {
		idToken: undefined,
		refreshToken: undefined
	}
};

export const createAuthSlice: SliceCreator<AuthSlice> = (set) => ({
	auth: initial,
	clearAuth: () => set(initial),
	setAuth(auth) {
		set((state) => {
			state.auth = auth;
		});
	}
});
