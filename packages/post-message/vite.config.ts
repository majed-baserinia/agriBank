import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		sourcemap: "inline",
		lib: {
			entry: resolve(import.meta.dirname, "index.ts"),
			formats: ["es"],
			name: "post-message",
			fileName: "post-message"
		},
		rollupOptions: {
			external: ["react", "react-router-dom"]
		}
	},
	plugins: [tsconfigPaths(), dts()]
});
