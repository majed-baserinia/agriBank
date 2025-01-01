import { RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import "./i18n";
import "./index.css";
import { queryClient, router } from "./router";

const root = document.getElementById("root");

if (!root) {
	throw new Error("element with id='root' not found: cannot render the app!");
}

ReactDOM.createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
