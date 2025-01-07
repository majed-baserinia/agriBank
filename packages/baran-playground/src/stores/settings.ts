import type { schema } from "$/features/login";
import type { PreRegisterOutputDto, VerifyRegisterOtpOutputDto } from "$/services";
import type { RegisterOutputDto } from "$/services/.generated/customer-management/zod/schemas";
import type { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Environments = "pilot" | "test";

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
	environment: Environments;
	/**
	 * derived from environment
	 */
	baseUrl: string;
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
	setEnvironment: (environment: Environments) => void;
};

export const useSettingsStore = create<State & Actions>()(
	persist(
		immer((set, get) => ({
			environment: "test",
			get baseUrl() {
				return get().environment === "pilot"
					? "https://dgbankmb-pilot.bki.ir"
					: "https://digitalbanking-tst.bki.ir";
			},
			user: {},
			setEnvironment(environment) {
				set((state) => {
					state.environment = environment;
				});
			},
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
			}
		})),
		{
			name: "playground-settings"
		}
	)
);
