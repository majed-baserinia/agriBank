import { ButtonAdapter } from "@htsc/ui/components/ButtonAdapter";
import { pushAlert } from "@htsc/ui/stores/alerts";
import { useTranslation } from "react-i18next";

export function Home() {
	const { t } = useTranslation();

	return (
		<>
			<ButtonAdapter
				onClick={() => {
					pushAlert({
						type: "success",
						messageText: t("hi")
					});
				}}
			>
				Hello World
			</ButtonAdapter>
		</>
	);
}
