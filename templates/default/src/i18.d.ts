import "i18next";
import type FA_TRANSLATION from "./locals/fa/translation.json";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "translation";
		resources: {
			translation: typeof FA_TRANSLATION;
		};
	}
}
