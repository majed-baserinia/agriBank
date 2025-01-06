import { type ThemeOptions } from "@mui/material";

export async function getTheme(baseThemeUrl: string, paletteUrl: string, themeName: string) {
	try {
		const theme = await getBaseTheme(baseThemeUrl);
		const palette = await getCustomPalette(paletteUrl, themeName);
		theme.palette = palette && Object.keys(palette).length > 0 ? palette : theme.palette;
		return theme;
	} catch (error) {
		console.error("error while creating theme with custom palette", error);
		return {};
	}
}

export async function getBaseTheme(baseThemeUrl: string) {
	try {
		return (await (await fetch(`${baseThemeUrl}base-theme.json`)).json()) as ThemeOptions;
	} catch (error) {
		console.error("error while fetching theme", error);
		return {};
	}
}

export async function getCustomPalette(paletteUrl: string, themeName: string) {
	try {
		const url = `${paletteUrl}${themeName ? themeName : "light"}.json`;
		const customPalette = (await (await fetch(url)).json()) as ThemeOptions;

		return customPalette.palette;
	} catch (error) {
		console.error("error while fetching palette", error);
		return {};
	}
}
