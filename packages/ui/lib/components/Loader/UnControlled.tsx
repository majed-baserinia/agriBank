import { Controlled } from "./Controlled";
import { useLoading } from "./store";

/**
 * reads loading state from useLoading store
 */
export function UnControlled() {
	const isLoading = useLoading((s) => s.loading);
	return <Controlled showLoader={isLoading} />;
}
