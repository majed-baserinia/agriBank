import type { Environments } from "$/features/environment";
import type { schema } from "$/features/login";
import type {
	PreRegisterOutputDto,
	RegisterOutputDto,
	VerifyRegisterOtpOutputDto
} from "$/services";
import type { SliceCreator } from "$/stores/types";
import type { z } from "zod";

type LoginInput = z.infer<typeof schema>;

type PartialLoginInput = Partial<LoginInput>;

type Tokens = {
	idToken: string;
	refreshToken: string;
};

type User = {
	[key in Environments]: {
		input?: PartialLoginInput;
		output?: {
			preRegister?: PreRegisterOutputDto;
			verifyRegister?: VerifyRegisterOtpOutputDto;
			register?: RegisterOutputDto;
			login?: Tokens;
		};
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

const initial: State = { user: { pilot: {}, test: {} } };

export const createLoginSlice: SliceCreator<LoginSlice> = (set, get) => ({
	...initial,
	setUser(user) {
		set((state) => {
			state.user = { ...state.user, ...user };
		});
	},
	setLoginRequest(request) {
		set((state) => {
			state.user[get().environment].input = {
				...state.user[get().environment].input,
				login: request
			};
		});
	},
	setPreRegisterRequest(request) {
		set((state) => {
			state.user[get().environment].input = {
				...state.user[get().environment].input,
				preRegister: request
			};
		});
	},
	setVerifyRegisterRequest(request) {
		set((state) => {
			state.user[get().environment].input = {
				...state.user[get().environment].input,
				verifyRegister: request
			};
		});
	},
	setRegisterRequest(request) {
		set((state) => {
			state.user[get().environment].input = {
				...state.user[get().environment].input,
				register: request
			};
		});
	},
	setLoginResponse(response) {
		set((state) => {
			state.user[get().environment].output = {
				...state.user[get().environment].output,
				login: response
			};
		});
	},
	setPreRegisterResponse(response) {
		set((state) => {
			state.user[get().environment].output = {
				...state.user[get().environment].output,
				preRegister: response
			};
		});
	},
	setVerifyRegisterResponse(response) {
		set((state) => {
			state.user[get().environment].output = {
				...state.user[get().environment].output,
				verifyRegister: response
			};
		});
	},
	setRegisterResponse(response) {
		set((state) => {
			state.user[get().environment].output = {
				...state.user[get().environment].output,
				register: response
			};
		});
	},
	resetUser() {
		set(initial);
	}
});
