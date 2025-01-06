import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Navbar } from "$/components/Navbar";
import { PaperAdapter } from "@agribank/ui/components/PaperAdapter";

export const Route = createFileRoute("/_layout")({
	component: Layout
});

function Layout() {
	return (
		<>
			<PaperAdapter>
				<Navbar />
				<Outlet />
			</PaperAdapter>
		</>
	);
}
