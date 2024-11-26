import { htscPlugin } from "@htsc/ignite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		htscPlugin({ public: { modes: { dev: true, preview: true } } }),
		TanStackRouterVite({
			routesDirectory: "./src/routes",
			generatedRouteTree: "./src/routeTree.gen.ts",
			routeFileIgnorePrefix: "-",
			routeFilePrefix: "+",
			quoteStyle: "double",
			semicolons: true
		}),
		react()
	],
	base: `/__APP_NAME__`
});
