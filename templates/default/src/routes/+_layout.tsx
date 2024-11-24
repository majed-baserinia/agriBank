import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Navbar } from "$/components/Navbar";

export const Route = createFileRoute("/_layout")({
	component: Layout
});

function Layout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
