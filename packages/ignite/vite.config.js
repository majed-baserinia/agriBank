import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(import.meta.dirname, "index.ts"),
			formats: ["es"],
			name: "ignite",
			fileName: "ignite"
		},
		rollupOptions: {
			external: ["react", "zustand", "i18next", "react-i18next"],
			output: {
				globals: {
					react: "React",
					zustand: "Zustand",
					i18next: "I18next",
					"react-i18next": "ReactI18next"
				}
			}
		}
	},
	plugins: [tsconfigPaths(), dts({ rollupTypes: true })]
});
