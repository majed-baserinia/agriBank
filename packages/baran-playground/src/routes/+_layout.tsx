import { Box } from "@mui/material";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
	component: Layout
});

function Layout() {
	// console.log("layout");

	return (
		<Box sx={{ height: "100%" }}>
			<Outlet />
		</Box>
	);
}
