import { useAppStore } from "$/stores";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useSelectedApplication } from "../hooks";
import { type Application } from "../stores";

type Props = {
	app: Application;
};
export function App({ app }: Props) {
	const store = useAppStore();
	const selectedApplication = useSelectedApplication();
	return (
		<Card key={app.title}>
			<CardActionArea
				onClick={() => store.setSelectedApp(app)}
				data-active={selectedApplication?.title === app.title ? "" : undefined}
				sx={{
					height: "100%",
					"&[data-active]": {
						backgroundColor: "action.selected",
						"&:hover": {
							backgroundColor: "action.selectedHover"
						}
					}
				}}
			>
				<CardContent sx={{ height: "100%" }}>
					<Typography
						variant="h5"
						component="div"
					>
						{app.title}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
					>
						{app.url}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
