import type { PostMessageInput, PostMessageTypes } from "$lib/utils";

export function sendPostMessage<TType extends PostMessageTypes["type"]>(
	type: TType,
	data: PostMessageInput<TType>
) {
	sendPostMessageRaw({ type, data });
}

export function sendPostMessageRaw<T>(data: T) {
	const parentWindow = window.parent;
	parentWindow.postMessage(data, "*");
}
