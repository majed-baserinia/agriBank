import type { Environments } from "$/features/environment";
import type { schema } from "$/features/login";
import type {
	PreRegisterOutputDto,
	RegisterOutputDto,
	VerifyRegisterOtpOutputDto
} from "$/services";
import type { AppStore, SliceCreator } from "$/stores/types";
import { enqueueSnackbar } from "notistack";
import type { z } from "zod";

type LoginInput = z.infer<typeof schema>;

type PartialLoginInput = Partial<LoginInput>;
type PartialLoginOutput = {
	preRegister?: PreRegisterOutputDto;
	verifyRegister?: VerifyRegisterOtpOutputDto;
	register?: RegisterOutputDto;
	login?: Tokens;
};

type Tokens = {
	idToken: string;
	refreshToken: string;
};

type AccountNumber = string;
type User = {
	[key in Environments]: Map<
		AccountNumber,
		{
			input: PartialLoginInput;
			output: PartialLoginOutput;
		}
	>;
} & { activatedUserKey?: string };

type NewState<
	T extends
		| PartialLoginInput[keyof PartialLoginInput]
		| PartialLoginOutput[keyof PartialLoginOutput]
> = {
	/**
	 * key to filter users with
	 */
	key: string;
	data: T;
};

type State = {
	users: User;
};

type Actions = {
	setLoginRequest: (params: NewState<LoginInput["login"]>) => void;
	setPreRegisterRequest: (params: NewState<LoginInput["preRegister"]>) => void;
	setVerifyRegisterRequest: (params: NewState<LoginInput["verifyRegister"]>) => void;
	setRegisterRequest: (params: NewState<LoginInput["register"]>) => void;
	setLoginResponse: (params: NewState<Tokens>) => void;
	setPreRegisterResponse: (params: NewState<PreRegisterOutputDto>) => void;
	setVerifyRegisterResponse: (params: NewState<VerifyRegisterOtpOutputDto>) => void;
	setRegisterResponse: (params: NewState<RegisterOutputDto>) => void;
	setActiveUser: (key: string) => void;
	removeUser: (key: string) => void;
	resetUsers: () => void;
};

export type LoginSlice = State & Actions;

const initial: State = {
	users: {
		activatedUserKey: undefined,
		production: new Map(),
		pilot: new Map(),
		test: new Map()
	}
};

export const createLoginSlice: SliceCreator<LoginSlice> = (set, get) => ({
	...initial,
	setLoginRequest(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: true,
				key: "login",
				params: params
			});
		});
	},
	setPreRegisterRequest(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: true,
				key: "preRegister",
				params: params
			});
		});
	},
	setVerifyRegisterRequest(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: true,
				key: "verifyRegister",
				params: params
			});
		});
	},
	setRegisterRequest(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: true,
				key: "register",
				params: params
			});
		});
	},
	setLoginResponse(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: false,
				key: "login",
				params: params
			});
		});
	},
	setPreRegisterResponse(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: false,
				key: "preRegister",
				params: params
			});
		});
	},
	setVerifyRegisterResponse(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: false,
				key: "verifyRegister",
				params: params
			});
		});
	},
	setRegisterResponse(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: false,
				key: "register",
				params: params
			});
		});
	},
	removeUser(accountNumber) {
		set((state) => {
			state.users[get().environment].delete(accountNumber);
			state.users[get().environment] = { ...state.users[get().environment] };
		});
	},
	setActiveUser(accountNumber) {
		set((state) => {
			const user = state.users[get().environment].get(accountNumber);
			if (!user) {
				enqueueSnackbar({
					message: "a user with this account does not exist",
					variant: "error"
				});
				return;
			}
			state.users.activatedUserKey = accountNumber;
		});
	},
	resetUsers() {
		set(initial);
	}
});

function updateState<TIsRequest extends boolean, TKey extends keyof PartialLoginOutput>({
	stagedState,
	getCurrentState,
	params,
	isRequest,
	key
}: {
	stagedState: AppStore;
	getCurrentState: () => AppStore;
	isRequest: TIsRequest;
	params: NewState<TIsRequest extends true ? PartialLoginInput[TKey] : PartialLoginOutput[TKey]>;
	key: TKey;
}) {
	if (!key) {
		return;
	}

	const user = stagedState.users[getCurrentState().environment].get(params.key) ?? {
		input: {},
		output: {}
	};

	// set this user as active if there no active users available
	if (!stagedState.users.activatedUserKey) {
		stagedState.users.activatedUserKey = params.key;
	}

	if (isRequest) {
		user.input = {
			...user.input,
			[key]: params.data
		};
	} else {
		user.output = {
			...user.output,
			[key]: params.data
		};
	}

	stagedState.users[getCurrentState().environment].set(params.key, user);
}
