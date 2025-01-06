import "@agribank/i18n/types";

import type FA_TRANSLATION from "./locals/fa/translation.json";

declare module "i18next" {
	interface AGRIBankTypeOptions {
		defaultNS: "translation";
		resources: {
			translation: typeof FA_TRANSLATION;
		};
	}
}
