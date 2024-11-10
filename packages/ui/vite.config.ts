import react from "@vitejs/plugin-react";
import { existsSync, readdirSync, statSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import tsconfigPaths from "vite-tsconfig-paths";

function getComponentEntries() {
	const componentsDir = resolve(__dirname, "lib/components");
	const entries: Record<string, string> = {};

	readdirSync(componentsDir).forEach((dir) => {
		const fullPath = resolve(componentsDir, dir, "index.ts");
		if (statSync(resolve(componentsDir, dir)).isDirectory() && existsSync(fullPath)) {
			if (dir[0].toUpperCase() !== dir[0]) {
				throw new Error(`component folders should start with uppercase: ${dir}`);
			}
			entries[dir] = fullPath;
		}
	});

	return entries;
}

const componentEntries = getComponentEntries();

export default defineConfig({
	build: {
		emptyOutDir: true,
		sourcemap: true,
		lib: {
			entry: {
				utils: resolve(import.meta.dirname, "lib/utils/index.ts"),
				tailwindConfig: resolve(import.meta.dirname, "tailwind.base.config.js"),
				...componentEntries
			},
			formats: ["es"],
			name: "ui",
			fileName: (_, filename) => {
				if (Object.keys(componentEntries).includes(filename)) {
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
				/react\/*/,
				"react-dom",
				"react-router-dom",
				"zustand",
				"i18next",
				"react-i18next",
				"@htsc/post-message",
				"@htsc/ignite",
				"@glidejs/glide",
				/@mui\/*/,
				/@emotion\/*/,
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
	plugins: [react(), tsconfigPaths(), libInjectCss(), dts()]
});
