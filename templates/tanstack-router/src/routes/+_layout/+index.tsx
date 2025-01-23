import { ButtonAdapter } from "@agribank/ui/components/ButtonAdapter";
import { pushAlert } from "@agribank/ui/stores/alerts";
import { Typography } from "@mui/material";
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
				<Typography
					data-testid="hello-world"
					variant="bodyMd"
				>
					Hello World
				</Typography>
			</ButtonAdapter>
		</>
	);
}
