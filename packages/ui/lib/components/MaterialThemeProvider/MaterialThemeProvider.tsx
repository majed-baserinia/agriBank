import { GlobalStyles } from "$lib/components/MaterialThemeProvider/GlobalStyles";
import { useEmotionCache } from "$lib/components/MaterialThemeProvider/useEmotionCache";
import { useMergedTheme } from "$lib/components/MaterialThemeProvider/useMergedTheme";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { Props } from "./types";

export const MaterialThemeProvider = ({ theme, children }: Props) => {
	const themeTemplate = useMergedTheme(theme);
	const emotionCache = useEmotionCache();

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={themeTemplate}>
				<CssBaseline /* MUI Styles */ />
				<GlobalStyles
					direction={themeTemplate.direction}
					fontFamily={themeTemplate.typography.fontFamily}
				/>
				{children}
			</ThemeProvider>
		</CacheProvider>
	);
};
