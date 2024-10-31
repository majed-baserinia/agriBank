import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	define: {
		"import.meta.dynamic.env": "import.meta.env"
	},
	build: {
		lib: {
			entry: resolve(import.meta.dirname, "index.ts"),
			formats: ["es"],
			name: "ignite",
			fileName: "ignite"
		},
		rollupOptions: {
			external: [
				"react",
				"react-router-dom",
				"zustand",
				"i18next",
				"react-i18next",
				"@htsc/post-message",
				"zod"
			]
		}
	},
	plugins: [tsconfigPaths(), dts({ rollupTypes: true })]
});
