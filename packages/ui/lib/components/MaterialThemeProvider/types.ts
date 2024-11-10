import type { ThemeOptions } from "@mui/material";
import type { ReactNode } from "react";

export type Props = {
	/**
	 * custom theme options, typically exported from "@htsc/ignite"
	 */
	theme?: Partial<ThemeOptions>;
	children: ReactNode;
};
