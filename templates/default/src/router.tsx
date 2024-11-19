import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export const router = createRouter({
	context: {
		queryClient: new QueryClient()
	},
	defaultPreload: "intent",
	routeTree
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
