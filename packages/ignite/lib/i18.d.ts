import "i18next";
import type BASE_FA_TRANSLATION from "$lib/locales/fa/base.json";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "BASE";
		resources: {
			BASE: typeof BASE_FA_TRANSLATION;
		};
	}
}
