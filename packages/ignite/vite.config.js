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
			external: ["react", "zustand"],
			output: {
				globals: {
					react: "React",
					zustand: "Zustand"
				}
			}
		}
	},
	plugins: [tsconfigPaths(), dts({ rollupTypes: true })]
});
