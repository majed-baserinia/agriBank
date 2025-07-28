import { useLayoutEffect, useRef } from "react";
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
	finishedPaths?: string[];
};

export function usePostMessageLoader({
	onInitializationFailed,
	useRouter,
	finishedPaths = [],
	...restProps
}: Props) {
	const { currentPath, goBack } = useRouter();
	const paramConfig = useSearchParamsConfigLoader(useRouter);
	const { t } = useTranslation("base");

	const currentPathRef = useRef(currentPath);

	useLayoutEffect(() => {
		currentPathRef.current = currentPath;
	}, [currentPath]);

	const normalize = (path: string) => path.replace(/\/+$/, "");
	const normalizedFinishedPaths = [...finishedPaths].map(normalize);

	const connection = useConnection<ConnectionType>({
		onGobackPressed: () => {
			const current = normalize(window.location.pathname);

			if (normalizedFinishedPaths.some(path => current.includes(path)) || current == normalize(environment().BASE_URL)) {
				sendPostMessage("isFinishedBack", { data: "true" });
			} else {
				goBack();
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
