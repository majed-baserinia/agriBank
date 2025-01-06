import { Login } from "$/features/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/playground/login/")({
	component: RouteComponent
});

function RouteComponent() {
	return <Login />;
}
