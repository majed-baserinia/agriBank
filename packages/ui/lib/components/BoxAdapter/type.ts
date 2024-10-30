import type { Breakpoint, PaperProps } from "@mui/material";
import type { ReactNode } from "react";

export type Props = {
	children: ReactNode | ReactNode[];
	fullWidthBreakpoint?: Breakpoint | number;
	muiPaperProps?: PaperProps;
};
