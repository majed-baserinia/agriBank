import "@htsc/ignite";
import type FA_TRANSLATION from "./locals/fa/translation.json";

declare module "i18next" {
	interface HTSCTypeOptions {
		defaultNS: "translation";
		resources: {
			translation: typeof FA_TRANSLATION;
		};
	}
}
