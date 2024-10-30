import { Dialog, Grid, useMediaQuery, useTheme } from "@mui/material";

import type { Props } from "./types";

export function ModalOrPage(props: Props) {
	const { breakpoint, children, ModalPaperProps, open, setOpen } = props;
	const theme = useTheme();
	const isMatched = useMediaQuery(theme.breakpoints.down(breakpoint));

	const gridStyle = {
		position: "absolute",
		top: "0",
		left: "0",
		right: "0",
		bottom: "0",
		zIndex: "9",
		padding: "16px",
		height: window.innerHeight + "px",
		backgroundColor: theme.palette.background.paper
	};

	return isMatched ? (
		<Grid sx={isMatched ? { ...gridStyle } : null}>{children}</Grid>
	) : (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			PaperProps={ModalPaperProps}
		>
			{children}
		</Dialog>
	);
}
