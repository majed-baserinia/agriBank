import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: resolve(import.meta.dirname, "index.ts"),
			formats: ["es"],
			name: "i18n",
			fileName: "i18n"
		},
		rollupOptions: {
			external: ["i18next"]
		}
	},
	plugins: [tsconfigPaths(), dts()]
});
