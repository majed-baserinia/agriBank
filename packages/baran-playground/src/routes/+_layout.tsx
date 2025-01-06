import { createFileRoute, Outlet } from "@tanstack/react-router";

import MiniDrawer from "$/components/Navbar/Navbar";
import { PaperAdapter } from "@agribank/ui/components/PaperAdapter";

export const Route = createFileRoute("/_layout")({
	component: Layout
});

function Layout() {
	return (
		<>
			<MiniDrawer>
				<PaperAdapter>
					<Outlet />
				</PaperAdapter>
			</MiniDrawer>
		</>
	);
}
