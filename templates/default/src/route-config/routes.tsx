import { createBrowserRouter } from "react-router-dom";

import { Layout } from "../pages/Layout";
import { Home } from "../pages/Home";
import { paths } from "./paths";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					path: paths.Home,
					element: <Home />
				}
			]
		}
	],
	{
		basename: import.meta.env.BASE_URL
	}
);

export default router;
