import type { QueryClient } from "@tanstack/react-query";

import { useInit, useInitialSettingStore } from "@htsc/ignite";
import { Alerts } from "@htsc/ui/components/Alerts";
import { Loader } from "@htsc/ui/components/Loader";
import { MaterialThemeProvider } from "@htsc/ui/components/MaterialThemeProvider";
import { RootStyles } from "@htsc/ui/components/RootStyles";
import { pushAlert } from "@htsc/ui/stores/alerts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { StrictMode } from "react";

export type RootContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
	component: App
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

	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RootStyles>
					<MaterialThemeProvider theme={theme}>
						<Alerts />
						<ScrollRestoration />
						{isReady ? <Outlet /> : <Loader showLoader />}
					</MaterialThemeProvider>
				</RootStyles>

				<TanStackRouterDevtools position="bottom-right" />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</StrictMode>
	);
}
