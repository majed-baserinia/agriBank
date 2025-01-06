import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/playground/login/")({
	component: RouteComponent
});

function RouteComponent() {
	return <div>login and see current user data</div>;
}
