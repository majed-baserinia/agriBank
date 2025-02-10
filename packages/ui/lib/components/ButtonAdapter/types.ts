import type { ButtonProps } from "@mui/material";
import type { ReactNode } from "react";

export type ButtonAdapterProps = {
	backIcon?: boolean;
	children?: ReactNode | ReactNode[];
	disabled?: boolean;
	endIcon?: ReactNode;
	forwardIcon?: boolean;
	muiButtonProps?: ButtonProps;
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
	size?: Size;
	startIcon?: ReactNode;
	variant?: "contained" | "outlined" | "text";
	loading?: boolean;
};

type Size = "large" | "medium" | "small";
