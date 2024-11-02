import "i18next";
import type { BaseLanguageOptions } from "./i18n/i18n";

declare module "i18next" {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface CustomTypeOptions extends BaseLanguageOptions {}
}
