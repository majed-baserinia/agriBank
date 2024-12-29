import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		emptyOutDir: true,
		sourcemap: true,
		lib: {
			entry: resolve(import.meta.dirname, "./src/index.ts"),
			formats: ["es"],
			name: "baran-api-client",
			fileName: "baran-api-client"
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
		react(),
		tsconfigPaths(),
		dts({
			tsconfigPath: "./tsconfig.app.json"
		})
	]
});
