import { findApp } from "$/features/apps";
import { MicroAppPortal } from "$/features/micro";
import { useAppStore } from "$/stores";
import { Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/$environment/$app/")({
	component: RouteComponent
});

function RouteComponent() {
	const apps = useAppStore((s) => s.applications.apps);
	const params = Route.useParams();
	const app = findApp(apps, params.app);

	if (!app) {
		return (
			<Typography
				variant="bodyLg"
				color="error"
			>
				Application not found!
			</Typography>
		);
	}
	return (
		<MicroAppPortal
			className="h-full w-full"
			app={app}
		/>
	);
}
