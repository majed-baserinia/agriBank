export * from "./lib";

import "i18next";
import type { BaseLanguageOptions } from "./lib";

export type ModifiedHTSCTypeOptions<T> = T extends { defaultNS: string }
	? Omit<BaseLanguageOptions, "defaultNS"> & T
	: BaseLanguageOptions & T;

declare module "i18next" {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	export interface HTSCTypeOptions {}

	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface CustomTypeOptions extends ModifiedHTSCTypeOptions<HTSCTypeOptions> {}
}
