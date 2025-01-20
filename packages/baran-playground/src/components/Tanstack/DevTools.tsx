import { lazy, Suspense } from "react";

const TanStackRouterDevtoolsPromise = import.meta.env.PROD
	? () => null // Render nothing in production
	: lazy(() =>
			// Lazy load in development
			import("@tanstack/router-devtools").then((res) => ({
				default: res.TanStackRouterDevtools
				// For Embedded Mode
				// default: res.TanStackRouterDevtoolsPanel
			}))
		);

type Props = {
	position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export function TanStackRouterDevtools({ position }: Props) {
	return (
		<Suspense>
			<TanStackRouterDevtoolsPromise position={position} />
		</Suspense>
	);
}
