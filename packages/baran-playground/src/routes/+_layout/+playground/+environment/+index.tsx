import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/playground/environment/")({
	component: RouteComponent
});

function RouteComponent() {
	return <div>change environments and see their urls</div>;
}
