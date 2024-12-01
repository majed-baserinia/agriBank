import type { SelectProps } from "@mui/material";
import type { ReactNode } from "react";

export type Props = {
	children: ReactNode | ReactNode[];
	defaultValue?: string;
	disabled?: boolean;
	error?: boolean;
	helperText?: string;
	icon?: ReactNode;
	isRequired?: boolean;
	label?: string;
	muiSelectProps?: SelectProps;
	onChange: (value: string) => void;
	renderValue?: (option: string) => ReactNode;
	size?: "medium" | "small";
};
