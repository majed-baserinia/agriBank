import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/$environment/")({
	component: RouteComponent
});

function RouteComponent() {
	return <div>select the application</div>;
}
