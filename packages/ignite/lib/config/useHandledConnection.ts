import { useSearchParamsConfigLoader } from "$lib/config/loaders/useSearchParamsConfigLoader";
import { environment } from "$lib/env";
import type { InitialSetting } from "$lib/stores";
import {
	closeApp,
	sendPostMessage,
	useConnection,
	type ConnectionProps
} from "@agribank/post-message";
import { useCanGoBack, useMatch, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

type ConnectionType = {
	type: "initiateIFrame";
	data: InitialSetting;
};

export type Props = Omit<ConnectionProps<ConnectionType>, "onInitializationFailed"> & {
	onInitializationFailed?: (errorMessage: string) => boolean;
};

export function useHandledConnection({ onInitializationFailed, ...restProps }: Props) {
	const router = useRouter();
	const canGoBack = useCanGoBack();

	const paramConfig = useSearchParamsConfigLoader();
	const match = useMatch({
		strict: false
	});
	const { t } = useTranslation("base");

	const connection = useConnection<ConnectionType>({
		onGobackPressed: () => {
			const currentPath = match.pathname;
			if (
				currentPath === environment().BASE_URL ||
				`${currentPath}/` === environment().BASE_URL ||
				!canGoBack
			) {
				sendPostMessage("isFinishedBack", "true");
			} else {
				(router.history as History).back();
				//send acknowledge to the parent
				closeApp();
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
