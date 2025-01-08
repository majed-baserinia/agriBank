import { useAppStore } from "$/stores";
import { Box } from "@mui/material";
import { App } from "./App";

export function Apps() {
	const store = useAppStore();
	return (
		<Box
			sx={{
				width: "100%",
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
				gap: 2
			}}
		>
			{store.applications.apps.map((app) => (
				<App
					key={app.title}
					app={app}
				/>
			))}
		</Box>
	);
}
