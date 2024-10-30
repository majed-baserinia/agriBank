import { environment } from "$lib/env";
import { type InitialSetting, pushAlert } from "$lib/stores";
import { type ConnectionProps, closeApp, useConnection } from "@htsc/post-message";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export type Props = ConnectionProps<InitialSetting>;

export function useHandledConnection(props: Props) {
	const navigate = useNavigate();
	const { t } = useTranslation("BASE");

	return useConnection<InitialSetting>({
		onGobackPressed: () => {
			if (
				window.location.pathname === environment.BASE_URL ||
				`${window.location.pathname}/` === environment.BASE_URL
			) {
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
}
