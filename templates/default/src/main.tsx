import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

// TODO: switch to component based routes
import router from "./route-config/routes";
import { initLanguage } from "./i18n";

void initLanguage();
const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	</StrictMode>
);
