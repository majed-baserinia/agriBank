import { lazy, Suspense } from "react";
import type { DevToolsProps } from "./type";

const TanStackRouterDevtoolsPromise = import.meta.dynamic.env.PROD
	? () => null // Render nothing in production
	: lazy(() =>
			// Lazy load in development
			import("@tanstack/router-devtools").then((res) => ({
				default: res.TanStackRouterDevtools
				// For Embedded Mode
				// default: res.TanStackRouterDevtoolsPanel
			}))
		);

export function TanStackRouterDevtools({ position }: DevToolsProps) {
	return (
		<Suspense>
			<TanStackRouterDevtoolsPromise position={position} />
		</Suspense>
	);
}
