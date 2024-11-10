import BASE_EN_TRANSLATION from "$lib/locales/en/base.json";
import BASE_FA_TRANSLATION from "$lib/locales/fa/base.json";
import { type i18n } from "i18next";

export type BaseLanguageOptions = {
	defaultNS: "base";
	resources: {
		base: typeof BASE_FA_TRANSLATION;
	};
};

/**
 * this will be called after the i18next instance has been initialized, therefore initializing i18 instance
 * is on the consumer
 * @param instance - i18n instance that you should initialize yourself
 */
export function initLanguagePacks(instance: i18n) {
	const _callback = () => {
		void instance.addResourceBundle("en-GB", "base", BASE_EN_TRANSLATION);
		void instance.addResourceBundle("fa-IR", "base", BASE_FA_TRANSLATION);
	};
	if (instance.isInitialized) {
		_callback();
		return;
	}
	instance.on("initialized", _callback);
}

//makes sure all the keys of Fa and En are the same
BASE_FA_TRANSLATION satisfies typeof BASE_EN_TRANSLATION;
BASE_EN_TRANSLATION satisfies typeof BASE_FA_TRANSLATION;
