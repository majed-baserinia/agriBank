import { pushAlert } from "@htsc/ignite";
import { ButtonAdapter } from "@htsc/ui/components/ButtonAdapter";
import { useTranslation } from "react-i18next";
export function Home() {
	const { t } = useTranslation("");
	t("hi")

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
