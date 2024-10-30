import type { InputType } from "$components/InputAdapter/type";
import { filter } from "$components/InputAdapter/utils";

type Options = {
	type: InputType;
};
export function useFormatter({ type }: Options) {
	return (value: string) => {
		return filter(type, value);
	};
}
