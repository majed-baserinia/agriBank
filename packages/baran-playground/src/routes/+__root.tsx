import { TanStackRouterDevtools } from "$/components/Tanstack/DevTools";
import { useCiLoader, useConfigOverrides } from "$/hooks";
import { useInitClients } from "$/services";
import { searchParamsSchema } from "$/utils/search-params";
import { searchParamsConfigSchema, useIgniteStore, useInit } from "@agribank/ignite";
import { useRouter } from "@agribank/ignite/router/tanstack-router";
import { Alerts } from "@agribank/ui/components/Alerts";
import { Loader, useLoadingHandler } from "@agribank/ui/components/Loader";
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
import { zodValidator } from "@tanstack/zod-adapter";
import { SnackbarProvider } from "notistack";
import type { z } from "zod";

export type RootContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
	component: App,
	validateSearch: zodValidator(searchParamsSchema),
	search: {
		middlewares: [
			retainSearchParams(
				Object.keys(searchParamsConfigSchema.parse({})) as (keyof z.infer<
					typeof searchParamsConfigSchema
				>)[]
			)
		]
	}
});

function App() {
	const { queryClient } = Route.useRouteContext();
	const configOverrides = useConfigOverrides();
	const isReady = useInit({
		onInitializationFailed: (message) => {
			pushAlert({
				hasConfirmAction: true,
				messageText: message,
				type: "error"
			});
			return false;
		},
		useRouter,
		configOverrides
	});
	useLoadingHandler(!isReady);
	const theme = useIgniteStore((state) => state.settings.theme);
	useInitClients();
	useCiLoader();

	return (
		<QueryClientProvider client={queryClient}>
			<RootStyles>
				<MaterialThemeProvider theme={theme}>
					<SnackbarProvider>
						<Alerts />
						<ScrollRestoration />
						<Loader.UnControlled />
						{isReady ? <Outlet /> : <></>}
					</SnackbarProvider>
				</MaterialThemeProvider>
			</RootStyles>

			<TanStackRouterDevtools position="bottom-left" />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
