export type AuthState = {
	auth: {
		idToken?: string;
		refreshToken?: string;
	};
};

type AuthActions = {
	setAuth: (auth: AuthState["auth"]) => void;
	clearAuth: () => void;
};

export type AuthSlice = AuthState & AuthActions;
