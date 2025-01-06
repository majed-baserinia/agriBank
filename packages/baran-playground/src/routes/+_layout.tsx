import { createFileRoute, Outlet } from "@tanstack/react-router";

import MiniDrawer from "$/components/Navbar/Navbar";
import { BoxAdapter } from "@agribank/ui/components/BoxAdapter";

export const Route = createFileRoute("/_layout")({
	component: Layout
});

function Layout() {
	return (
		<>
			<MiniDrawer>
				<BoxAdapter>
					<Outlet />
				</BoxAdapter>
			</MiniDrawer>
		</>
	);
}
