export type PostMessageTypes =
	| {
			type: "tokenIsNotValid";
			input: { data: "true" };
	  }
	| {
			type: "iFrameReady";
			input: { data: "Hi Parent" };
			output:
				| {
						type: "initiateIFrame";
						data: {
							// NOTE: this extra data is intentional, in {type: x, data: y}, data's VALUE is whatever is being sent
							// from the superapp, in this case superapp sends an object with the data key.
							data: {
								/* start: used in request headers (afaik only osType is send during initIframe event) */
								osType: string;
								osVersion?: string;
								applicationName?: string;
								applicationVersion?: string;
								deviceId?: string;
								/* end */
								idToken?: string;
								refreshToken?: string;
								[key: string]: unknown;
							};
						};
				  }
				| {
						type: "goback";
						data: never;
				  };
	  }
	| { type: "wentBack"; input: { data: "true" } }
	| { type: "isFinishedBack"; input: { data: "true" } }
	| {
			type: "GetOTP";
			input: { data: { OTPLen: string; ReadMode: "UserConsent" } };
			output: { type: "ResOTP"; data: { OTP: string } };
	  }
	| { type: "iFrameStillAlive"; input: { data: "I am still working" } };

export type PostMessageType<TType extends PostMessageTypes["type"]> = Extract<
	PostMessageTypes,
	{ type: TType }
>;

export type PostMessageInput<TType extends PostMessageTypes["type"]> =
	PostMessageType<TType>["input"] extends infer TNaked
		? TNaked extends { data: infer TData }
			? TData extends Record<string, any>
				? { [Key in keyof TData]: TData[Key] }
				: { data: TData }
			: never
		: never;

export type PostMessageOutput<TType extends PostMessageTypes["type"]> =
	PostMessageType<TType> extends { output: infer TOutput } ? TOutput : never;

export type PostMessageOutputs = Extract<
	PostMessageTypes,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	{ output: { type: any; data: any } }
>["output"] extends infer U
	? U extends { type: infer TType; data?: infer TData }
		? [TData] extends [never]
			? { type: TType; data: TData }
			: // eslint-disable-next-line @typescript-eslint/no-explicit-any
				TData extends Record<string, any>
				? { type: TType } & { [K in keyof TData]: TData[K] }
				: { type: TType; data: TData }
		: never
	: never;

export type PostMessageOutputData<TType extends PostMessageTypes["type"]> =
	PostMessageType<TType> extends { output: infer TOutput }
		? TOutput extends { data: infer TData }
			? TData
			: never
		: never;

export type PostMessageOutputSubTypes<TType extends PostMessageTypes["type"]> =
	PostMessageType<TType> extends { output: infer TOutput }
		? TOutput extends { type: infer TTypes }
			? TTypes
			: never
		: never;

export type PostMessageOutputSubType<
	TType extends PostMessageTypes["type"],
	TSubType extends PostMessageOutputSubTypes<TType>
> = TSubType extends never
	? never
	: Extract<PostMessageOutput<TType>, { type: TSubType }> extends {
				data: infer TData;
		  }
		? TData
		: never;
