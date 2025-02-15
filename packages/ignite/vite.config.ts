import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	define: {
		"import.meta.dynamic.env": "import.meta.env"
	},
	build: {
		emptyOutDir: true,
		sourcemap: false,
		lib: {
			entry: {
				ignite: resolve(import.meta.dirname, "index.ts"),
				reactRouterProvider: resolve(import.meta.dirname, "lib/facade/router/remix/index.ts"),
				tanstackRouterProvider: resolve(import.meta.dirname, "lib/facade/router/tanstack/index.ts")
			},
			formats: ["es"],
			name: "ignite",
			fileName: (_, filename) => `${filename}.js`
		},
		rollupOptions: {
			external: [
				"react",
				/react\/*/,
				"react-dom",
				"react-router",
				/@tanstack\/*/,
				"immer",
				"zustand",
				/zustand\/*/,
				"i18next",
				"react-i18next",
				/@agribank\/*/,
				"zod"
			]
		}
	},
	plugins: [
		tsconfigPaths(),
		dts({
			tsconfigPath: "./tsconfig.app.json",
			insertTypesEntry: true
		})
	]
});
