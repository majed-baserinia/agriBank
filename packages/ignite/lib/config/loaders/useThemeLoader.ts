import { type ThemeOptions } from "@mui/material";
import { useEffect, useState } from "react";

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

export function useThemeLoader(
	baseThemeUrl: string | undefined,
	paletteUrl: string | undefined,
	themeName: string | undefined
) {
	const [theme, setTheme] = useState<ThemeOptions>();

	useEffect(() => {
		if (!baseThemeUrl || !paletteUrl || !themeName) {
			return;
		}
		getTheme(baseThemeUrl, paletteUrl, themeName)
			.then((theme) => {
				setTheme(theme);
			})
			.catch((e) => {
				throw new Error("cannot load theme", { cause: e });
			});
	}, [baseThemeUrl, paletteUrl, themeName]);

	return { theme, isThemeLoaded: theme !== undefined };
}
