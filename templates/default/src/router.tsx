import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export const router = createRouter({
	context: {
		queryClient: new QueryClient()
	},
	defaultPreload: "intent",
	basepath: import.meta.env.BASE_URL,
	routeTree
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
