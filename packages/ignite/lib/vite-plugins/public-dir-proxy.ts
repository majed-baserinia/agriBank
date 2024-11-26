import type { Plugin, PreviewServer, ViteDevServer } from "vite";

type Config = {
	dev: boolean;
	preview?: boolean;
};

/**
 * redirects requests from `/${somefile}` to `/${vite.config.base}/${somefile}`
 * @param modes - in which modes this plugin is applied
 */
export function htscPublicDirProxy(modes: Config): Plugin {
	const changeRequestPath = (server: PreviewServer | ViteDevServer) => {
		server.middlewares.use((req, _, next) => {
			if (req.url && !req.url.startsWith(server.config.base)) {
				req.url = `${server.config.base}${req.url}`;
			}
			next();
		});
	};

	return {
		name: "vite-htsc-public-dir-proxy",
		configureServer(server) {
			if (!modes.dev) {
				return;
			}
			changeRequestPath(server);
		},
		configurePreviewServer(server) {
			if (!modes.preview) {
				return;
			}
			changeRequestPath(server);
		}
	};
}
