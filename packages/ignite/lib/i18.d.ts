import "i18next";
import BASE_FA_TRANSLATION from "./common/locales/fa/base.json";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "BASE";
		resources: {
			BASE: typeof BASE_FA_TRANSLATION;
		};
	}
}
