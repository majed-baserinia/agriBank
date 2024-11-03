import "i18next";
import type { BaseLanguageOptions } from "./i18n";

export type ModifiedHTSCTypeOptions<T> = BaseLanguageOptions & T;

declare module "i18next" {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	export interface HTSCTypeOptions {}

	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface CustomTypeOptions extends ModifiedHTSCTypeOptions<HTSCTypeOptions> {}
}
