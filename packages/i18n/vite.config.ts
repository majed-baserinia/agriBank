import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		lib: {
			entry: {
				i18n: resolve(import.meta.dirname, "index.ts"),
				types: resolve(import.meta.dirname, "./lib/types/index.ts")
			},
			formats: ["es"],
			name: "i18n",
			fileName: (_, entryName) => {
				return `${entryName}.js`;
			}
		},
		sourcemap: false,
		rollupOptions: {
			external: ["i18next", "zod-i18n-map"]
		}
	},
	plugins: [tsconfigPaths(), dts({ tsconfigPath: "./tsconfig.app.json" })]
});
