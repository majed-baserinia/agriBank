import type { PostMessageInput, PostMessageTypes } from "$lib/utils";

export function sendPostMessageRaw<T>(data: T, target = window.parent) {
	target.postMessage(data, "*");
}

export function sendPostMessage<TType extends PostMessageTypes["type"]>(
	type: TType,
	data: PostMessageInput<TType>
) {
	let message = {};
	if (typeof data === "string") {
		message = { type, data };
	} else {
		message = { type, ...(data as unknown as Record<string, unknown>) };
	}
	return sendPostMessageRaw(message);
}
