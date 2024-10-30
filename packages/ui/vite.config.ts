import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

export default defineConfig({
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
				"@htsc/ignite",
				"@glidejs/glide",
				"@mui/*",
				"@emotion/*",
				"stylis",
				"stylis-plugin-rtl",
				"react-modal-sheet",
				"react-multi-date-picker",
				"react-camera-pro",
				"react-date-object",
				"zod"
			]
		}
	},
	plugins: [react(), tsconfigPaths(), dts({ rollupTypes: true })]
});
