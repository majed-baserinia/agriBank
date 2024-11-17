import { ButtonAdapter } from "@htsc/ui/components/ButtonAdapter";
import { pushAlert } from "@htsc/ui/stores/alerts";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
	component: Index
});

function Index() {
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
