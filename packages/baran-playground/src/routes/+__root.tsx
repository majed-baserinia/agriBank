import { useInitClients } from "$/services";
import { useSettingsStore } from "$/stores/settings";
import { searchParamsConfigSchema, useInit, useInitialSettingStore } from "@agribank/ignite";
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
import type { z } from "zod";

export type RootContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
	component: App,
	validateSearch: (param) => {
		return searchParamsConfigSchema.parse({
			Lang: "en-GB",
			Auth: "false",
			Theme: "dark",
			...param
		});
	},
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
	const settings = useSettingsStore();
	const isReady = useInit({
		onInitializationFailed: (message) => {
			pushAlert({
				hasConfirmAction: true,
				messageText: message,
				type: "error"
			});
			return false;
		},
		configOverrides: { apiBaseUrl: settings.baseUrl }
	});
	useLoadingHandler(!isReady);
	const theme = useInitialSettingStore((state) => state.settings.theme);
	useInitClients();

	return (
		<QueryClientProvider client={queryClient}>
			<RootStyles>
				<MaterialThemeProvider theme={theme}>
					<Alerts />
					<ScrollRestoration />
					<Loader.UnControlled />
					{isReady ? <Outlet /> : <></>}
				</MaterialThemeProvider>
			</RootStyles>

			<TanStackRouterDevtools position="bottom-left" />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
