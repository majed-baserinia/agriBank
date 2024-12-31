import { isBaranClientResult } from "$/types";
import { pushAlert } from "@agribank/ui/stores/alerts";

export function alertBaranError(result: unknown, throwError: boolean = false) {
	if (!isBaranClientResult(result)) {
		return;
	}

	if (!result.error) {
		return;
	}

	switch (result.error.type) {
		case "InternalError":
		case "UnknownApiError":
		case "ApiError":
			if (throwError) {
				throw new Error(result.error.message);
			}
			pushAlert({
				type: "error",
				messageText: result.error.message
			});
	}
}
