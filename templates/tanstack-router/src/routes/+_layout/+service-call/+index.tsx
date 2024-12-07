import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/service-call/")({
	component: Info,
	loader: () => {
		// return getSheba(12314);
		return { data: { iban: "IR123" } };
	}
});

function Info() {
	const { data } = Route.useLoaderData();
	return <>{data.iban}</>;
}
