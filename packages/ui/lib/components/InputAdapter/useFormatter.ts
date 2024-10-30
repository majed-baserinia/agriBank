import type { InputType } from "$lib/components/InputAdapter/types";
import { filter } from "$components/InputAdapter/utils";

type Options = {
	type: InputType;
};
export function useFormatter({ type }: Options) {
	return (value: string) => {
		return filter(type, value);
	};
}
