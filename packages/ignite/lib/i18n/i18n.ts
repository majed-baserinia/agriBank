import BASE_EN_TRANSLATION from "$lib/locales/en/base.json";
import BASE_FA_TRANSLATION from "$lib/locales/fa/base.json";
import i18next from "i18next";

export type BaseLanguageOptions = {
	defaultNS: "base";
	resources: {
		base: typeof BASE_FA_TRANSLATION;
	};
};
export function addLanguagePacks() {
	const _callback = () => {
		void i18next.addResourceBundle("en-GB", "base", BASE_EN_TRANSLATION);
		void i18next.addResourceBundle("fa-IR", "base", BASE_FA_TRANSLATION);
	};
	if (i18next.isInitialized) {
		_callback();
		return;
	}
	i18next.on("initialized", _callback);
}

//makes sure all the keys of Fa and En are the same
BASE_FA_TRANSLATION satisfies typeof BASE_EN_TRANSLATION;
BASE_EN_TRANSLATION satisfies typeof BASE_FA_TRANSLATION;
