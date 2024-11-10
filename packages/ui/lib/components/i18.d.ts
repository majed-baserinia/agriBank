import type { BaseLanguageOptions } from "@htsc/ignite";
import "i18next";

declare module "i18next" {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface CustomTypeOptions extends BaseLanguageOptions {}
}
