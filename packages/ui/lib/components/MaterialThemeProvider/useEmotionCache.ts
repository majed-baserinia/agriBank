import createCache from "@emotion/cache";
import { useTranslation } from "react-i18next";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const rtlCache = createCache({
	key: "muirtl",
	stylisPlugins: [prefixer, rtlPlugin]
});

const ltrCache = createCache({ key: "muiltr" });

export function useEmotionCache() {
	const { i18n } = useTranslation();
	if (i18n.language === "fa-IR") {
		return rtlCache;
	} else {
		return ltrCache;
	}
}
