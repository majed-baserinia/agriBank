import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/$environment/")({
	component: RouteComponent
});

function RouteComponent() {
	return <div>retrieve token based on environment and return token in loader</div>;
}
