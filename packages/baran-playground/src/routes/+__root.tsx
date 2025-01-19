import { convert } from "$/features/environment";
import { useInitClients } from "$/services";
import { useAppStore } from "$/stores/app";
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
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import type { z } from "zod";

export type RootContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
	component: App,
	validateSearch: (params) =>
		searchParamsConfigSchema.parse({
			Lang: "en-GB",
			Auth: "false",
			Theme: "dark",
			...params
		}) as { Lang?: string; Auth?: boolean; Theme?: string },
	// TODO: ^-- remove this cast
	search: {
		middlewares: [
			// @ts-expect-error - for now i have to do this, when the types of these functions gets fixed we can remove these
			retainSearchParams(
				Object.keys(searchParamsConfigSchema.parse({})) as (keyof z.infer<
					typeof searchParamsConfigSchema
				>)[]
			)
		]
	}
});

function useConfigOverrides() {
	const settings = useAppStore();
	const configOverrides = useMemo(() => {
		return { apiBaseUrl: convert(settings.environment) };
	}, [settings.environment]);
	return configOverrides;
}

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
