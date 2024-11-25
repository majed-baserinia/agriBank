import type { PostMessageTypes } from "$lib/utils";
import { useEffect, useRef } from "react";

type PostMessageProps<TRequest extends PostMessageTypes, TResponse> = {
	callback: (e: MessageEvent<TResponse>) => void;
	message?: TRequest;
};

export default function usePostMessage<TRequest extends PostMessageTypes, TResponse>(
	props: PostMessageProps<TRequest, TResponse>
) {
	const { callback, message } = props;
	const hasSentAlready = useRef(false);

	useEffect(() => {
		if (!hasSentAlready.current) {
			hasSentAlready.current = true;
			window.addEventListener("message", callback, false);

			if (message) {
				window.parent.postMessage(message, "*");
			}
		}

		return () => {
			window.removeEventListener("message", callback);
		};
	}, []);
}
