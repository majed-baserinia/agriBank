import { RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

import { StrictMode } from "react";
import "./i18n";
import "./index.css";
import { router } from "./router";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
