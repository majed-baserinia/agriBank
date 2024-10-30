import "@material-ui/core/styles";

//this file should be in the root of the project
//the code declares new type for the palette colors to material UI

declare module "@mui/material/styles" {
	interface PaletteColor {
		main: string;
		"50": string;
		"100": string;
		"200": string;
		"300": string;
		"400": string;
		"500": string;
		"600": string;
		"700": string;
		"800": string;
		"900": string;
		contrastText: string;
	}

	interface BreakpointOverrides {
		xs: true;
		sm: true;
		md: true;
		lg: true;
		xl: true;
		tablet: true;
	}

	interface TypographyVariants {
		h1Sm: React.CSSProperties;
		h1Md: React.CSSProperties;
		h1Lg: React.CSSProperties;
		bodyXs: React.CSSProperties;
		bodySm: React.CSSProperties;
		bodyMd: React.CSSProperties;
		bodyLg: React.CSSProperties;
	}
	interface TypographyVariantsOptions {
		h1Sm?: React.CSSProperties;
		h1Md?: React.CSSProperties;
		h1Lg?: React.CSSProperties;
		bodyXs?: React.CSSProperties;
		bodySm?: React.CSSProperties;
		bodyMd?: React.CSSProperties;
		bodyLg?: React.CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		h1Sm: true;
		h1Md: true;
		h1Lg: true;
		bodyXs: true;
		bodySm: true;
		bodyMd: true;
		bodyLg: true;
	}
}
