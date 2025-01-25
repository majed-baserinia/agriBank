import { type AxiosError, isAxiosError } from "axios";

const NET_ERR = Symbol.for("NET_ERR");

export function setNetworkError(error: AxiosError) {
	Object.assign(error, { [NET_ERR]: true });
}

export function isAxiosNetworkError(error: unknown): boolean {
	if (!isAxiosError(error)) {
		return false;
	}

	return NET_ERR in error;
}
