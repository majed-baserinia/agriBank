import { sendPostMessage } from "./sendPostMessage";

export function alertAppIsStillRunning() {
	if (window.self === window.top) {
		return;
	}
	sendPostMessage("iFrameStillAlive", { data: "I am still working" });
}
