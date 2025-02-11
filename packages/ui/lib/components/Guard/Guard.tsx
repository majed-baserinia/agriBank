import { useGuardStore } from "$lib/stores/guard";
import { use } from "react";
import type { Props } from "./types";

export function Guard({ required, onFailure, children }: Props) {
	const store = useGuardStore();

	if (!store.fulfilledSteps.has(required)) {
		const result = onFailure();
		if (result instanceof Promise) {
			use(result);
			return <></>;
		}
		return <></>;
	}

	return <>{children}</>;
}
