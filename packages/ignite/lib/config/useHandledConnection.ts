import { useSearchParamsConfigs } from "$lib/config/useSearchParamsConfigs";
import { environment } from "$lib/env";
import { type InitialSetting } from "$lib/stores";
import { closeApp, useConnection, type ConnectionProps } from "@agribank/post-message";
import { useMatch, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export type Props = Omit<ConnectionProps<InitialSetting>, "onInitializationFailed"> & {
	onInitializationFailed?: (errorMessage: string) => boolean;
};

export function useHandledConnection({ onInitializationFailed, ...restProps }: Props) {
	const navigate = useNavigate();
	const paramConfig = useSearchParamsConfigs();

	const match = useMatch({
		strict: false
	});
	const { t } = useTranslation("base");

	const connection = useConnection<InitialSetting>({
		onGobackPressed: () => {
			const currentPath = match.pathname;
			if (currentPath === environment().BASE_URL || `${currentPath}/` === environment().BASE_URL) {
				closeApp();
			} else {
				void navigate({ to: -1 });
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
		readyToLoad: !paramConfig.Auth || connection.readyToLoad
	};
}
