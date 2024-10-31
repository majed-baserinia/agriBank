import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { readdirSync, statSync, existsSync } from "fs";
import { stringify } from "querystring";

function getComponentEntries() {
	const componentsDir = resolve(__dirname, "lib/components");
	const entries: Record<string, string> = {};

	readdirSync(componentsDir).forEach((dir) => {
		const fullPath = resolve(componentsDir, dir, "index.ts");
		if (statSync(resolve(componentsDir, dir)).isDirectory() && existsSync(fullPath)) {
			entries[dir] = fullPath;
		}
	});

	return entries;
}

export default defineConfig({
	build: {
		emptyOutDir: true,
		lib: {
			entry: {
				utils: resolve(import.meta.dirname, "lib/utils/index.ts"),
				tailwindConfig: resolve(import.meta.dirname, "tailwind.base.config.js"),
				...getComponentEntries()
			},
			formats: ["es"],
			name: "ui",
			fileName: (_, filename) => {
				console.log(filename);
				if (filename[0].toUpperCase() === filename[0]) {
					return `components/${filename}/index.js`;
				}
				if (filename === "tailwindConfig") {
					return `${filename}.js`;
				}
				return "utils.js";
			}
		},
		rollupOptions: {
			external: [
				"react",
				"jsx-runtime",
				"react-router-dom",
				"tailwind-scrollbar",
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
	plugins: [react(), tsconfigPaths(), dts()]
});
