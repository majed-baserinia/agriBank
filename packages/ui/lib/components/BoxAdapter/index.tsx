import { Paper, useTheme } from "@mui/material";

import type { Props } from "./type";

export default function BoxAdapter(props: Props) {
	const { children, fullWidthBreakpoint = "sm", muiPaperProps } = props;
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
				padding: "16px"
			}}
			{...muiPaperProps}
		>
			{children}
		</Paper>
	);
}
