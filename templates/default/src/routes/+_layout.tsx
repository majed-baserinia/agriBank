import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Navbar } from "$/components/Navbar";
import { BoxAdapter } from "@htsc/ui/components/BoxAdapter";

export const Route = createFileRoute("/_layout")({
	component: Layout
});

function Layout() {
	return (
		<>
			<BoxAdapter>
				<Navbar />
				<Outlet />
			</BoxAdapter>
		</>
	);
}
