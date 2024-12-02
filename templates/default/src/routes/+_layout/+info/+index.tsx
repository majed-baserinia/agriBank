import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/info/")({
	component: Info,
	loader: () => {
		// depending on your api it should look like something like:
		// return await AccountsClient().getSheba(1020342603);
		return {
			data: {
				iban: "IR13123"
			}
		};
	}
});

function Info() {
	const { data } = Route.useLoaderData();
	return <>{data.iban}</>;
}
