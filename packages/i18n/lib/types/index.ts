import type { BaseLanguageOptions } from "$lib/i18n";

import "i18next";

export type ModifiedAGRIBankTypeOptions<T> = T extends { defaultNS: string }
	? Omit<BaseLanguageOptions, "defaultNS"> & T
	: BaseLanguageOptions & T;

declare module "i18next" {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	export interface AGRIBankTypeOptions {}

	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface CustomTypeOptions extends ModifiedAGRIBankTypeOptions<AGRIBankTypeOptions> {}
}
