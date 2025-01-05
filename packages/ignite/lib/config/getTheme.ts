import { type ThemeOptions } from "@mui/material";

export async function getTheme(themeUrl: string, themeName: string) {
	try {
		const theme = await getBaseTheme(themeUrl);
		const palette = await getCustomPalette(themeUrl, themeName);
		theme.palette = palette && Object.keys(palette).length > 0 ? palette : theme.palette;
		return theme;
	} catch (error) {
		console.error("error while creating theme with custom palette", error);
		return {};
	}
}

export async function getBaseTheme(themeUrl: string) {
	try {
		return (await (
			await fetch(`${themeUrl}base.json?ignite-base-theme=true`)
		).json()) as ThemeOptions;
	} catch (error) {
		console.error("error while fetching theme", error);
		return {};
	}
}

export async function getCustomPalette(themeUrl: string, themeName: string) {
	try {
		const url = `${themeUrl}${themeName ? themeName : "light"}.json`;
		const customPalette = (await (await fetch(url)).json()) as ThemeOptions;

		return customPalette.palette;
	} catch (error) {
		console.error("error while fetching palette", error);
		return {};
	}
}
