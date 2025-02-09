import { sendPostMessage } from "$lib/utils";

export function closeApp() {
	sendPostMessage("isFinishedBack", { data: "true" });
}
