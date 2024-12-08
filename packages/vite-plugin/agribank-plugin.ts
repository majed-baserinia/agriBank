import type { Plugin, PreviewServer, ViteDevServer } from "vite";

type Config = {
	/**
	 * redirects requests from `/${somefile}` to `/${vite.config.base}/${somefile}`
	 */
	public: {
		/**
		 * in which modes this plugin is applied
		 */
		modes: {
			dev: boolean;
			preview?: boolean;
		};
		/**
		 * a list of extra files that this plugin will reroute
		 */
		extraFiles?: string[];
	};
};

function changeRequestPathOfSharedPublicFiles(
	server: PreviewServer | ViteDevServer,
	extraFiles?: string[]
) {
	const files = [
		"config.json",
		"compatibility.js",
		"browserUpdate.js",
		"default-theme.json",
		...(extraFiles ?? [])
	];
	server.middlewares.use((req, _, next) => {
		if (req.url && files.some((fileName) => req.url === `/${fileName}`)) {
			req.url = `${server.config.base}${req.url}`;
		}
		next();
	});
}

export function agribankPlugin(config: Config): Plugin {
	return {
		name: "vite-agribank-plugin",
		configureServer(server) {
			if (!config.public.modes.dev) {
				return;
			}
			changeRequestPathOfSharedPublicFiles(server, config.public.extraFiles);
		},
		configurePreviewServer(server) {
			if (!config.public.modes.preview) {
				return;
			}
			changeRequestPathOfSharedPublicFiles(server, config.public.extraFiles);
		}
	};
}
