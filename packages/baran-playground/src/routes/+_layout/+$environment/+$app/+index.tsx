import { findApp } from "$/features/apps";
import { usePeriodicLogin } from "$/features/login";
import { type Handlers, MicroAppPortal } from "$/features/micro";
import { useAppStore } from "$/stores";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/_layout/$environment/$app/")({
	component: RouteComponent
});

function RouteComponent() {
	const apps = useAppStore((s) => s.applications.apps);
	const login = usePeriodicLogin();
	const params = Route.useParams();
	const app = findApp(apps, params.app);
	const environment = useAppStore((s) => s.environment.active);
	const isRenderedOnce = useRef(false);
	const micro = useRef<Handlers>(null);

	useEffect(() => {
		if (!app) {
			return;
		}
		if (!isRenderedOnce.current) {
			isRenderedOnce.current = true;
			return;
		}

		enqueueSnackbar({
			message: "changing environment requires a hard refresh on your micro front.",
			variant: "info",
			action() {
				return (
					<IconButton
						title="reload"
						aria-label="reload"
						color="inherit"
						sx={{ p: 0.5 }}
						onClick={() => micro.current?.reload()}
					>
						<RefreshIcon />
					</IconButton>
				);
			}
		});
	}, [environment]);

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
			ref={micro}
			login={login}
		/>
	);
}
