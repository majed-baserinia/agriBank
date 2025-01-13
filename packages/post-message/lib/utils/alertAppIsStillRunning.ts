import { sendPostMessage } from "./sendPostMessage";
export function alertAppIsStillRunning() {
	if (window.self === window.top) {
		return;
	}
	sendPostMessage("iFrameStillAlive", "I am still working");
}
