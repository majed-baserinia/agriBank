import { environment } from "$lib/env";
import { type InitialSetting } from "$lib/stores";
import { type ConnectionProps, closeApp, useConnection } from "@htsc/post-message";
import { useMatch, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export type Props = Omit<ConnectionProps<InitialSetting>, "onInitializationFailed"> & {
	onInitializationFailed?: (errorMessage: string) => boolean;
};

export function useHandledConnection({ onInitializationFailed, ...restProps }: Props) {
	const navigate = useNavigate();
	const match = useMatch({
		strict: false
	});
	const { t } = useTranslation("base");

	const connection = useConnection<InitialSetting>({
		onGobackPressed: () => {
			const currentPath = match.pathname;
			if (
				currentPath === environment.VITE_APP_BASE_URL ||
				`${currentPath}/` === environment.VITE_APP_BASE_URL
			) {
				closeApp();
			} else {
				navigate({ to: -1 });
				//send acknowledge to the parent
				closeApp();
			}
		},
		onInitializationFailed: () => {
			const errorMessage = t("initErrorText");
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
		readyToLoad: environment.VITE_FORCE_IFRAME_READY
			? environment.VITE_FORCE_IFRAME_READY
			: connection.readyToLoad
	};
}
