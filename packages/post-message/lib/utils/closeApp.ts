import { sendPostMessage } from "$lib/utils";

export function closeApp() {
	sendPostMessage("isFinishedBack", "true");
}
