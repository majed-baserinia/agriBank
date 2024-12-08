import { type ThemeOptions } from "@mui/material";

export async function getTheme(themeUrl: string, themeName: string) {
	try {
		const theme = await getBaseTheme();
		const palette = await getCustomPalette(themeUrl, themeName);
		theme.palette = palette;
		return theme;
	} catch (error) {
		console.error("error while creating theme with custom palette", error);
		return {};
	}
}

export async function getBaseTheme() {
	try {
		let theme: ThemeOptions = {};

		if (import.meta.dynamic.env.DEV) {
			// @ts-expect-error - this is json import so it has type errors, cuz there are not type decls for that
			theme = (
				await import("@agribank/ui/assets/themes/default.json", {
					with: { type: "json" }
				})
			).default as ThemeOptions;
		} else {
			theme = (await (await fetch("/default-theme.json")).json()) as ThemeOptions;
		}

		return theme;
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
