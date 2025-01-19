import type { useRouter as useRouterType } from "$lib/facade/router";
import {
	useCanGoBack,
	useMatch,
	useSearch,
	useRouter as useTanstackRouter
} from "@tanstack/react-router";

export const useRouter: useRouterType = () => {
	const router = useTanstackRouter();
	const match = useMatch({ strict: false });
	const canGoBack = useCanGoBack();
	const searchParams = useSearch({ strict: false }) as unknown;

	return {
		type: "tanstack",
		searchParams,
		canGoBack,
		currentPath: match.pathname,
		goBack: () => (router.history as History).back()
	};
};
