import { agribankPlugin } from "@agribank/vite-plugin";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export const APP_NAME = "/";

export default defineConfig(({ mode }) => {
	if (mode === "cli") {
		return {
			build: {
				ssr: true,
				sourcemap: false,
				emptyOutDir: false,
				lib: {
					entry: resolve(import.meta.dirname, "./src/cli/cli.ts"),
					formats: ["es"],
					name: "cli",
					fileName: "cli"
					// UI stuff starting from index.html ???
				}
			},
			plugins: [
				tsconfigPaths(),
				dts({
					insertTypesEntry: true,
					compilerOptions: {
						sourceMap: false,
						declarationMap: false
					}
				})
			],
			base: APP_NAME
		};
	} else {
		return {
			build: {
				sourcemap: false,
				emptyOutDir: false
			},
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
		};
	}
});
