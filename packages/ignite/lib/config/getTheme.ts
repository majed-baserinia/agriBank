import defaultTheme from "public/defaultTheme.json";

export async function getTheme(themeUrl: string, themeName: string) {
	try {
		const url = `${themeUrl}${themeName ? themeName : "light"}.json`;

		const rawRes = await fetch(url);
		const res = (await rawRes.json()) as typeof defaultTheme;
		const theme = { ...defaultTheme };
		theme.palette = res.palette;

		return theme;
	} catch (_) {
		return defaultTheme;
	}
}
