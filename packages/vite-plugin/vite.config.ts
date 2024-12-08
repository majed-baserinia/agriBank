import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		emptyOutDir: true,
		sourcemap: true,
		lib: {
			entry: resolve(import.meta.dirname, "index.ts"),
			formats: ["es"],
			name: "vite-agribank-plugin",
			fileName: "vite-agribank-plugin"
		},
		rollupOptions: {
			external: ["vite"]
		}
	},
	plugins: [
		tsconfigPaths(),
		dts({
			insertTypesEntry: true
		})
	]
});
