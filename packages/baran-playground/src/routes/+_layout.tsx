import { createFileRoute, Outlet } from "@tanstack/react-router";

import { MiniDrawer } from "$/components/Navbar/Navbar";
import { Box } from "@mui/material";

export const Route = createFileRoute("/_layout")({
	component: Layout
});

function Layout() {
	return (
		<>
			<MiniDrawer>
				<Box sx={{ height: "100%", padding: 10 }}>
					<Outlet />
				</Box>
			</MiniDrawer>
		</>
	);
}
