import { searchParamsConfigSchema, useInit, useInitialSettingStore } from "@agribank/ignite";
import { Alerts } from "@agribank/ui/components/Alerts";
import { Loader } from "@agribank/ui/components/Loader";
import { MaterialThemeProvider } from "@agribank/ui/components/MaterialThemeProvider";
import { RootStyles } from "@agribank/ui/components/RootStyles";
import { pushAlert } from "@agribank/ui/stores/alerts";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	Outlet,
	retainSearchParams,
	ScrollRestoration
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { zodValidator } from "@tanstack/zod-adapter";
import type { z } from "zod";

export type RootContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
	component: App,
	validateSearch: zodValidator(searchParamsConfigSchema),
	search: {
		middlewares: [
			retainSearchParams(
				Object.keys(searchParamsConfigSchema.shape) as (keyof z.infer<
					typeof searchParamsConfigSchema
				>)[]
			)
		]
	}
});

function App() {
	const { queryClient } = Route.useRouteContext();
	const isReady = useInit({
		onInitializationFailed: (message) => {
			pushAlert({
				hasConfirmAction: true,
				messageText: message,
				type: "error"
			});
			return false;
		}
	});
	const theme = useInitialSettingStore((state) => state.settings.theme);
	// useInitClients(); uncomment this and whats in services/clients in case of using `@agribank/cli generate-clients`

	return (
		<QueryClientProvider client={queryClient}>
			<RootStyles>
				<MaterialThemeProvider theme={theme}>
					<Alerts />
					<ScrollRestoration />
					{isReady ? <Outlet /> : <Loader showLoader />}
				</MaterialThemeProvider>
			</RootStyles>

			<TanStackRouterDevtools position="bottom-left" />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
