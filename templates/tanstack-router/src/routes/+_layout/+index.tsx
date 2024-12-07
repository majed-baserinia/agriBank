import { ButtonAdapter } from "@htsc/ui/components/ButtonAdapter";
import { pushAlert } from "@htsc/ui/stores/alerts";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_layout/")({
	component: Index
});

function Index() {
	const { t } = useTranslation();

	return (
		<>
			<ButtonAdapter
				variant="contained"
				onClick={() => {
					pushAlert({
						messageText: t("hi"),
						type: "success"
					});
				}}
			>
				Hello World
			</ButtonAdapter>
		</>
	);
}
