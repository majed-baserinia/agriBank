import type { useRouter as useRouterType } from "$lib/facade/router";
import { useLocation, useNavigate, useSearchParams } from "react-router";

export const useRouter: useRouterType = () => {
	const location = useLocation();
	const [searchParams, _] = useSearchParams();
	const navigate = useNavigate();

	return {
		type: "react-router",
		searchParams,
		canGoBack: history.length > 1,
		currentPath: location.pathname,
		async goBack() {
			await navigate(-1);
		}
	};
};
