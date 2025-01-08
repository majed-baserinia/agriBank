import { initLanguagePacks } from "@agribank/i18n";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

export function useLanguageLoader(language: string | undefined) {
	const { i18n } = useTranslation();

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (!language) {
			return;
		}
		i18n
			.changeLanguage(language)
			.then(() => {
				setIsLoaded(true);
			})
			.catch((error) => {
				throw new Error("cannot change language", {
					cause: error
				});
			});
	}, [i18n, language]);

	useEffect(() => {
		initLanguagePacks(i18n);
		z.setErrorMap(zodI18nMap);
	}, [i18n]);

	return { isLanguageLoaded: isLoaded, language: i18n.language };
}
