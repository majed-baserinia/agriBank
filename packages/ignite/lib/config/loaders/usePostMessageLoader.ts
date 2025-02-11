import { useSearchParamsConfigLoader } from "$lib/config/loaders/useSearchParamsConfigLoader";
import { environment } from "$lib/env";
import type { useRouter } from "$lib/facade/router";
import type { Settings } from "$lib/stores/settings";
import { sendPostMessage, useConnection, type ConnectionProps } from "@agribank/post-message";

import { useTranslation } from "react-i18next";

type ConnectionType = {
	type: "initiateIFrame";
	data: Settings;
};

export type Props = Omit<ConnectionProps<ConnectionType>, "onInitializationFailed"> & {
	onInitializationFailed?: (errorMessage: string) => boolean;
	useRouter: useRouter;
};

export function usePostMessageLoader({ onInitializationFailed, useRouter, ...restProps }: Props) {
	const { currentPath, canGoBack, goBack } = useRouter();
	const paramConfig = useSearchParamsConfigLoader(useRouter);

	const { t } = useTranslation("base");

	const connection = useConnection<ConnectionType>({
		onGobackPressed: () => {
			if (
				currentPath === environment().BASE_URL ||
				`${currentPath}/` === environment().BASE_URL ||
				!canGoBack
			) {
				sendPostMessage("isFinishedBack", { data: "true" });
			} else {
				void goBack();
				//send acknowledge to the parent
				sendPostMessage("wentBack", { data: "true" });
			}
		},
		onInitializationFailed: () => {
			const errorMessage = t("init-error-text");
			if (onInitializationFailed?.(errorMessage) === false) {
				return false;
			}
			alert(errorMessage);
			return false;
		},
		...restProps
	});

	return {
		...connection,
		readyToLoad: !paramConfig.Auth || connection.readyToLoad
	};
}
