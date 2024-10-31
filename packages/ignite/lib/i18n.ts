import BASE_EN_TRANSLATION from "$lib/locales/en/base.json";
import BASE_FA_TRANSLATION from "$lib/locales/fa/base.json";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export type BaseLanguageOptions = {
	defaultNS: "base";
	resources: {
		base: typeof BASE_FA_TRANSLATION;
	};
};

void i18next
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		// the translations
		// (tip move them in a JSON file and import them,
		// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
		resources: {
			"en-GB": {
				base: BASE_EN_TRANSLATION
			},
			"fa-IR": {
				base: BASE_FA_TRANSLATION
			}
		},
		lng: "fa-IR", // if you're using a language detector, do not define the lng option
		fallbackLng: "fa-IR",
		interpolation: {
			escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
		}
	});

//makes sure all the keys of Fa and En are the same
BASE_FA_TRANSLATION satisfies typeof BASE_EN_TRANSLATION;
BASE_EN_TRANSLATION satisfies typeof BASE_FA_TRANSLATION;

export default i18next;
