import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/info/")({
	component: Info
});

function Info() {
	return <>Hi from info page!</>;
}
