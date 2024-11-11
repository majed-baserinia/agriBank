import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: {
				i18n: resolve(import.meta.dirname, "index.ts"),
				types: resolve(import.meta.dirname, "./lib/types/index.ts")
			},
			formats: ["es"],
			name: "i18n",
			fileName: (_, entryName) => {
				console.log(entryName);
				return `${entryName}.js`;
			}
		},
		rollupOptions: {
			external: ["i18next"]
		}
	},
	plugins: [tsconfigPaths(), dts()]
});
