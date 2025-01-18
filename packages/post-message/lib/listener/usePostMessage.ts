import {
	sendPostMessageRaw,
	type PostMessageInput,
	type PostMessageOutput,
	type PostMessageTypes
} from "$lib/utils";
import { useEffect, useRef } from "react";

type PostMessageRawProps<TRequest, TResponse> = {
	callback: (e: MessageEvent<TResponse>) => void | Promise<void>;
	message?: TRequest;
	target?: Window;
};
export function usePostMessageRaw<TRequest, TResponse>({
	callback,
	message,
	target = window
}: PostMessageRawProps<TRequest, TResponse>) {
	const hasSentTheMessageOnce = useRef(false);
	useEffect(() => {
		const handler = (e: MessageEvent<TResponse>) => {
			void callback(e);
		};

		target.addEventListener("message", handler, false);

		if (message && !hasSentTheMessageOnce.current) {
			sendPostMessageRaw(message);
			hasSentTheMessageOnce.current = true;
		}

		return () => {
			target.removeEventListener("message", handler);
		};
	}, [target]);
}

export type PostMessageProps<TType extends PostMessageTypes["type"]> = PostMessageRawProps<
	{ type: TType; input: PostMessageInput<TType> },
	NoInfer<PostMessageOutput<TType>>
>;

export function usePostMessage<TType extends PostMessageTypes["type"]>({
	callback,
	message,
	target
}: PostMessageProps<TType>) {
	return usePostMessageRaw({ callback, message, target });
}
