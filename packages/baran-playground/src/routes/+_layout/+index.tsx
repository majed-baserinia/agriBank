import { Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent
});

function RouteComponent() {
	return <Typography>select something from toolbar</Typography>;
}
