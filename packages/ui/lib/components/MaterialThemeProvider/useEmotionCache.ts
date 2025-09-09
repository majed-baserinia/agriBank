import createCache from "@emotion/cache";
import { useTranslation } from "react-i18next";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export function useEmotionCache() {
	const { i18n } = useTranslation();

	return createCache({
		key: "mui",
		stylisPlugins: i18n.language === "fa-IR" ? [prefixer, rtlPlugin] : []
	});
}
