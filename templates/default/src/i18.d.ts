import "i18next";
import type FA_TRANSLATION from "./locals/fa/translation.json";
import type { BaseLanguageOptions } from "@htsc/ignite";

declare module "i18next" {
	interface CustomTypeOptions extends BaseLanguageOptions {
		defaultNS: "translation";
		resources: {
			translation: typeof FA_TRANSLATION;
		};
	}
}
