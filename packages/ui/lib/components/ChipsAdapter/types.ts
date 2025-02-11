import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";

export type Props = {
	color?: "default" | "error" | "info" | "primary" | "secondary" | "success" | "warning";
	count?: number;
	icon?: ReactNode;
	label: string;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	size?: "medium" | "small";
	variant?: "filled" | "outlined";
	sx?: SxProps<Theme>;
};
