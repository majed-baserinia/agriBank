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
		sourcemap: true,
		lib: {
			entry: resolve(import.meta.dirname, "index.ts"),
			formats: ["es"],
			name: "ignite",
			fileName: "ignite"
		},
		rollupOptions: {
			external: [
				"react",
				/react\/*/,
				"react-dom",
				/@tanstack\/*/,
				"zustand",
				"axios",
				"axios-retry",
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
			insertTypesEntry: true
		})
	]
});
