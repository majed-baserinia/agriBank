import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/$environment/$app/")({
	component: RouteComponent
});

function RouteComponent() {
	return <>run micro app based on $app which should be retrieved from localStorage</>;
}
