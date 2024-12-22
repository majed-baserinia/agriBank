import {
	sendPostMessageRaw,
	type PostMessageInput,
	type PostMessageOutput,
	type PostMessageTypes
} from "$lib/utils";
import { useEffect, useRef } from "react";

type PostMessageRawProps<TRequest, TResponse> = {
	callback: (e: MessageEvent<TResponse>) => void;
	message?: TRequest;
};
export function usePostMessageRaw<TRequest, TResponse>({
	callback,
	message
}: PostMessageRawProps<TRequest, TResponse>) {
	const hasSentAlready = useRef(false);
	useEffect(() => {
		if (!hasSentAlready.current) {
			hasSentAlready.current = true;
			window.addEventListener("message", callback, false);

			if (message) {
				sendPostMessageRaw(message);
			}
		}

		return () => {
			window.removeEventListener("message", callback);
		};
	}, []);
}

export type PostMessageProps<TType extends PostMessageTypes["type"]> = PostMessageRawProps<
	{ type: TType; input: PostMessageInput<TType> },
	NoInfer<PostMessageOutput<TType>>
>;

export function usePostMessage<TType extends PostMessageTypes["type"]>({
	callback,
	message
}: PostMessageProps<TType>) {
	return usePostMessageRaw({ callback, message });
}
