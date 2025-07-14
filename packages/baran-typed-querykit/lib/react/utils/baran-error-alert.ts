import { isBaranClientResult } from "$/types";
import { pushAlert } from "@agribank/ui/stores/alerts";
import { useTranslation } from "react-i18next";

export function alertBaranError(result: unknown, throwError: boolean = false) {
	const { t } = useTranslation("base");

	if (!isBaranClientResult(result)) {
		return;
	}

	if (!result.error) {
		return;
	}

	switch (result.error.type) {
		case "InternalError":
		case "UnknownApiError":
		case "NetworkError":
		case "ApiError":
			if (throwError) {
				throw new Error(result.error.message);
			}
			pushAlert({
				type: "error",
				messageText: result.error.message,
				hasConfirmAction: true,
				variantConfirm: "contained",
				colorConfirm: "warning",
				confirmButtonText: t("i-understand"),
			});
	}
}
