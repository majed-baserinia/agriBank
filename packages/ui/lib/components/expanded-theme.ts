import "@material-ui/core/styles";

//this file should be in the root of the project
//the code declares new type for the palette colors to material UI

declare module "@mui/material/styles" {
	interface PaletteColor {
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
		main: string;
	}

	interface BreakpointOverrides {
		lg: true;
		md: true;
		sm: true;
		tablet: true;
		xl: true;
		xs: true;
	}

	interface TypographyVariants {
		bodyLg: React.CSSProperties;
		bodyMd: React.CSSProperties;
		bodySm: React.CSSProperties;
		bodyXs: React.CSSProperties;
		h1Lg: React.CSSProperties;
		h1Md: React.CSSProperties;
		h1Sm: React.CSSProperties;
	}
	interface TypographyVariantsOptions {
		bodyLg?: React.CSSProperties;
		bodyMd?: React.CSSProperties;
		bodySm?: React.CSSProperties;
		bodyXs?: React.CSSProperties;
		h1Lg?: React.CSSProperties;
		h1Md?: React.CSSProperties;
		h1Sm?: React.CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		bodyLg: true;
		bodyMd: true;
		bodySm: true;
		bodyXs: true;
		h1Lg: true;
		h1Md: true;
		h1Sm: true;
	}
}

export {};
