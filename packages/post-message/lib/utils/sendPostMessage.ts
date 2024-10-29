import { PostMessageTypes } from "$lib/utils";

export function sendPostMessage(type: PostMessageTypes, data: string) {
	const parentWindow = window.parent;
	parentWindow.postMessage({ type, data }, "*");
}
