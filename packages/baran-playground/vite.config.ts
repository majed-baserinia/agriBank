import { agribankPlugin } from "@agribank/vite-plugin";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export const APP_NAME = "/";

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		agribankPlugin({ public: { modes: { dev: true, preview: true } } }),
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
	base: APP_NAME
});
