import { Apps } from "$/features/apps";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/playground/apps/")({
	component: RouteComponent
});

function RouteComponent() {
	return <Apps />;
}
