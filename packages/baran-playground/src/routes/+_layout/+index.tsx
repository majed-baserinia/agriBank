import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent
});

function RouteComponent() {
	return <div>contains the toolbar with empty content (saying open drawer?)</div>;
}
