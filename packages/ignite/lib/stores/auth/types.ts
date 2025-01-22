export type AuthState = {
	auth: {
		idToken?: string;
		refreshToken?: string;
	};
};

type AuthActions = {
	updateAuth: (auth: AuthState["auth"]) => void;
	clearAuth: () => void;
};

export type AuthSlice = AuthState & AuthActions;
