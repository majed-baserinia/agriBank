import type { Key } from "$lib/stores/guard";
import type { ReactElement } from "react";

export type Props = {
	required: Key;
	/**
	 * called when requirement is not satisfied
	 */
	onFailure: () => void | Promise<void>;
	children: ReactElement;
};
