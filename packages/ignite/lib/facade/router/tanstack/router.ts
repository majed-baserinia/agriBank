import type { useRouter as useRouterType } from "$lib/facade/router";
import { useCanGoBack, useSearch, useRouter as useTanstackRouter } from "@tanstack/react-router";

export const useRouter: useRouterType = () => {
	const router = useTanstackRouter();
	const canGoBack = useCanGoBack();
	const searchParams = useSearch({ strict: false }) as unknown;

	return {
		type: "tanstack",
		searchParams,
		canGoBack,
		currentPath: router.state.location.pathname,
		goBack: () => (router.history as History).back()
	};
};
