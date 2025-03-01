import { Paper, useTheme } from "@mui/material";

import type { Props } from "./types";

export function PaperAdapter({
	muiPaperProps: { sx, ...resetPaperProps } = {},
	fullWidthBreakpoint = 0,
	children
}: Props) {
	const theme = useTheme();

	return (
		<Paper
			elevation={0}
			sx={{
				minWidth: "25%",
				[theme.breakpoints.down(fullWidthBreakpoint)]: {
					borderRadius: 0
				},
				borderRadius: "32px",
				padding: "16px",
				...sx
			}}
			{...resetPaperProps}
		>
			{children}
		</Paper>
	);
}
