import type { Environments } from "$/features/environment";
import type { schema } from "$/features/login";
import type {
	ConfirmUpgradeForLevelTwoOutputDto,
	PreRegisterOutputDto,
	RegisterOutputDto,
	RequestUpgradeForLevelTwoOutputDto,
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
	upgradeLevel2OtpRequest?: RequestUpgradeForLevelTwoOutputDto;
	upgradeLevel2Confirm?: ConfirmUpgradeForLevelTwoOutputDto;
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
	 * key to identify this user with
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
	setUpgradeLevel2OtpRequest: (params: NewState<LoginInput["upgradeLevel2OtpRequest"]>) => void;
	setUpgradeLevel2ConfirmRequest: (params: NewState<LoginInput["upgradeLevel2Confirm"]>) => void;
	setLoginResponse: (params: NewState<Required<PartialLoginOutput>["login"]>) => void;
	setPreRegisterResponse: (params: NewState<Required<PartialLoginOutput>["preRegister"]>) => void;
	setVerifyRegisterResponse: (
		params: NewState<Required<PartialLoginOutput>["verifyRegister"]>
	) => void;
	setRegisterResponse: (params: NewState<Required<PartialLoginOutput>["register"]>) => void;
	setUpgradeLevel2OtpResponse: (
		params: NewState<Required<PartialLoginOutput>["upgradeLevel2OtpRequest"]>
	) => void;
	setUpgradeLevel2ConfirmResponse: (
		params: NewState<Required<PartialLoginOutput>["upgradeLevel2Confirm"]>
	) => void;
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
		test: new Map(),
		custom: new Map()
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
	setUpgradeLevel2OtpRequest(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: true,
				key: "upgradeLevel2OtpRequest",
				params: params
			});
		});
	},
	setUpgradeLevel2ConfirmRequest(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: true,
				key: "upgradeLevel2Confirm",
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
	setUpgradeLevel2OtpResponse(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: false,
				key: "upgradeLevel2OtpRequest",
				params: params
			});
		});
	},
	setUpgradeLevel2ConfirmResponse(params) {
		set((state) => {
			updateState({
				stagedState: state,
				getCurrentState: get,
				isRequest: false,
				key: "upgradeLevel2Confirm",
				params: params
			});
		});
	},
	removeUser(key) {
		set((state) => {
			state.users[get().environment.active].delete(key);
			state.users[get().environment.active] = { ...state.users[get().environment.active] };
		});
	},
	setActiveUser(key) {
		set((state) => {
			const user = state.users[get().environment.active].get(key);
			if (!user) {
				enqueueSnackbar({
					message: "a user with this account does not exist",
					variant: "error"
				});
				return;
			}
			state.users.activatedUserKey = key;
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

	const user = stagedState.users[getCurrentState().environment.active].get(params.key) ?? {
		input: {},
		output: {}
	};

	// set this user as active if there are no active users available
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

	stagedState.users[getCurrentState().environment.active].set(params.key, user);
}
