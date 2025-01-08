import type { schema } from "$/features/login";
import type {
	PreRegisterOutputDto,
	RegisterOutputDto,
	VerifyRegisterOtpOutputDto
} from "$/services";
import type { AppStore, Mutators } from "$/stores/types";
import type { z } from "zod";
import type { StateCreator } from "zustand";

type LoginInput = z.infer<typeof schema>;

type PartialLoginInput = Partial<LoginInput>;

type Tokens = {
	idToken: string;
	refreshToken: string;
};

type User = {
	input?: PartialLoginInput;
	output?: {
		preRegister?: PreRegisterOutputDto;
		verifyRegister?: VerifyRegisterOtpOutputDto;
		register?: RegisterOutputDto;
		login?: Tokens;
	};
};

type State = {
	user: User;
};

type Actions = {
	setUser: (user: User) => void;
	setLoginRequest: (request: LoginInput["login"]) => void;
	setPreRegisterRequest: (request: LoginInput["preRegister"]) => void;
	setVerifyRegisterRequest: (request: LoginInput["verifyRegister"]) => void;
	setRegisterRequest: (request: LoginInput["register"]) => void;
	setLoginResponse: (response: Tokens) => void;
	setPreRegisterResponse: (response: PreRegisterOutputDto) => void;
	setVerifyRegisterResponse: (response: VerifyRegisterOtpOutputDto) => void;
	setRegisterResponse: (response: RegisterOutputDto) => void;
	resetUser: () => void;
};

export type LoginSlice = State & Actions;

const initial = { user: {} };

export const createLoginSlice: StateCreator<AppStore, Mutators, [], LoginSlice> = (set) => ({
	...initial,
	setUser(user) {
		set((state) => {
			state.user = { ...state.user, ...user };
		});
	},
	setLoginRequest(request) {
		set((state) => {
			state.user.input = { ...state.user.input, login: request };
		});
	},
	setPreRegisterRequest(request) {
		set((state) => {
			state.user.input = { ...state.user.input, preRegister: request };
		});
	},
	setVerifyRegisterRequest(request) {
		set((state) => {
			state.user.input = { ...state.user.input, verifyRegister: request };
		});
	},
	setRegisterRequest(request) {
		set((state) => {
			state.user.input = { ...state.user.input, register: request };
		});
	},
	setLoginResponse(response) {
		set((state) => {
			state.user.output = { ...state.user.output, login: response };
		});
	},
	setPreRegisterResponse(response) {
		set((state) => {
			state.user.output = { ...state.user.output, preRegister: response };
		});
	},
	setVerifyRegisterResponse(response) {
		set((state) => {
			state.user.output = { ...state.user.output, verifyRegister: response };
		});
	},
	setRegisterResponse(response) {
		set((state) => {
			state.user.output = { ...state.user.output, register: response };
		});
	},
	resetUser() {
		set(initial);
	}
});
