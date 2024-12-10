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
	const files = ["config.json", "compatibility.js", "browserUpdate.js", ...(extraFiles ?? [])];
	server.middlewares.use(async (req, res, next) => {
		if (!req.url) {
			return next();
		}

		const url = new URL(`https://localhost${req.url}`);
		if (files.some((fileName) => url.pathname === `/${fileName}`)) {
			req.url = `${server.config.base}${req.url.substring(1)}`;
		} else if (url.pathname === `/default-theme.json`) {
			const theme = (
				await import("@agribank/ui/assets/themes/default.json", {
					with: { type: "json" }
				})
			).default;
			res.setHeader("content-type", "application/json");
			res.write(JSON.stringify(theme));
			res.end();
			return;
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
