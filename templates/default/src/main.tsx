import ReactDOM from "react-dom/client";

import { RouterProvider } from "@tanstack/react-router";
import "./i18n";
import "./index.css";
import { router } from "./router";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
