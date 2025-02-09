import {
	sendPostMessageRaw,
	type PostMessageInput,
	type PostMessageOutputs,
	type PostMessageTypes
} from "$lib/utils";
import { useCallback, useEffect } from "react";

type PostMessageRawProps<TRequest, TResponse, TParams = any> = {
	callback: (e: MessageEvent<TResponse>) => void | Promise<void>;
	message?: (...params: TParams[]) => TRequest;
	target?: Window;
};

export function usePostMessageRaw<TRequest, TResponse, TParams = any>({
	callback,
	message,
	target = window
}: PostMessageRawProps<TRequest, TResponse, TParams>) {
	useEffect(() => {
		const handler = (e: MessageEvent<TResponse>) => {
			void callback(e);
		};
		target.window.addEventListener("message", handler);
		return () => {
			target.window.removeEventListener("message", handler);
		};
	}, [target]);

	const send = useCallback(
		(...params: TParams[]) => {
			const msg = message?.(...params);
			if (msg === null || msg === undefined) {
				console.warn("trying to use `sendPostMessageRaw` with null or undefined");
				return;
			}
			return sendPostMessageRaw(msg);
		},
		[message]
	);

	return { send };
}

export type PostMessageProps<
	TType extends PostMessageTypes["type"],
	TParams = any
> = PostMessageRawProps<
	{
		type: TType;
	} & PostMessageInput<TType>,
	PostMessageOutputs,
	TParams
>;

export function usePostMessage<TType extends PostMessageTypes["type"], TParams = any>({
	callback,
	message,
	target = window
}: PostMessageProps<TType, TParams>) {
	return usePostMessageRaw({ callback, message, target });
}
