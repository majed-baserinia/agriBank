import { RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import "./i18n";
import "./index.css";
import { queryClient, router } from "./router";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
