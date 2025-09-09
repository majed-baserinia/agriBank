import { useAppStore } from "$/stores";
import { Box, Divider, Typography } from "@mui/material";
import { App } from "./App";
import { CreateApp } from "./CreateApp";

export function Apps() {
	const store = useAppStore();
	return (
		<Box padding={10}>
			<Box>
				<Typography
					variant="h1Md"
					marginBottom={5}
				>
					Add a new application
				</Typography>
				<CreateApp />
			</Box>
			<Divider sx={{ marginTop: 10, marginBottom: 10 }} />
			<Box
				sx={{
					width: "100%",
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
					marginTop: 10,
					gap: 10
				}}
			>
				{store.applications.apps.map((app) => (
					<App
						key={app.title}
						app={app}
					/>
				))}
			</Box>
		</Box>
	);
}
