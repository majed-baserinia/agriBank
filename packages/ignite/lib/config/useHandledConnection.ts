import { environment } from "$lib/env";
import { type InitialSetting, pushAlert } from "$lib/stores";
import { type ConnectionProps, closeApp, useConnection } from "@htsc/post-message";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export type Props = ConnectionProps<InitialSetting>;

export function useHandledConnection(props: Props) {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation("base");

	const connection = useConnection<InitialSetting>({
		onGobackPressed: () => {
			if (location.pathname === environment.VITE_BASE_URL || `${location.pathname}/` === environment.VITE_BASE_URL) {
				closeApp();
			} else {
				navigate(-1);
				//send acknowledge to the parent
				closeApp();
			}
		},
		onInitializationFailed: () => {
			pushAlert({
				type: "error",
				messageText: t("initErrorText"),
				hasConfirmAction: true,
				actions: {
					onConfirm() {
						closeApp();
					},
					onCloseModal() {
						closeApp();
					}
				}
			});
			return false;
		},
		...props
	});

	return {
		...connection,
		readyToLoad: environment.VITE_FORCE_IFRAME_READY ? environment.VITE_FORCE_IFRAME_READY : connection.readyToLoad
	};
}
