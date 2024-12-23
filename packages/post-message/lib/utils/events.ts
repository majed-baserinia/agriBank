export type PostMessageTypes =
	| {
			type: "tokenIsNotValid";
			input: "true";
	  }
	| {
			type: "iFrameReady";
			input: "Hi Parent";
			output:
				| {
						type: "initiateIFrame";
						data: {
							idToken?: string;
							refreshToken?: string;
							osType: number;
							[key: string]: unknown;
						};
				  }
				| {
						type: "goback";
						data: never;
				  };
	  }
	| { type: "wentBack"; input: "true" }
	| { type: "isFinishedBack"; input: "true" }
	| {
			type: "GetOTP";
			input: { OTPLen: string; ReadMode: "UserConsent" };
			output: { type: "ResOTP"; data: { OTP: string } };
	  };

export type PostMessageType<TType extends PostMessageTypes["type"]> = Extract<
	PostMessageTypes,
	{ type: TType }
>;

export type PostMessageInput<TType extends PostMessageTypes["type"]> =
	PostMessageType<TType>["input"];

export type PostMessageOutput<TType extends PostMessageTypes["type"]> =
	PostMessageType<TType> extends { output: infer TOutput } ? TOutput : never;

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
