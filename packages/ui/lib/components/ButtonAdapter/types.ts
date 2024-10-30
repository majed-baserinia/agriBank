import type { ButtonProps } from "@mui/material";
import type { ReactNode } from "react";

export type ButtonAdapterProps = {
	variant?: "text" | "contained" | "outlined";
	size?: Size;
	disabled?: boolean;
	backIcon?: boolean;
	forwardIcon?: boolean;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	children?: ReactNode | ReactNode[];
	muiButtonProps?: ButtonProps;
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

type Size = "medium" | "large" | "small";
