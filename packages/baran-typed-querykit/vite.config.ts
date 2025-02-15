import react from "@vitejs/plugin-react";
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
				"baran-typed-querykit": resolve(import.meta.dirname, "./lib/index.ts"),
				"baran-typed-querykit-react": resolve(import.meta.dirname, "./lib/react/index.ts")
			},
			formats: ["es"],
			name: "baran-api-client",
			fileName: (_, fileName) => {
				return `${fileName}.js`;
			}
		},
		rollupOptions: {
			external: [
				"react",
				/^react\/*/,
				"!src/react",
				"react-dom",
				/@tanstack\/*/,
				/^react-hook-form/,
				/^react-hook-form\/*/,
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
