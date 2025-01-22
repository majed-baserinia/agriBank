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
	updateAuth(auth) {
		set((state) => {
			state.auth = {
				idToken: auth.idToken,
				refreshToken: auth.refreshToken
			};
		});
	}
});
