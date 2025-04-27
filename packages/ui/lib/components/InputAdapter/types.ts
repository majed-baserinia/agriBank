import type { InputProps, SxProps, TextFieldProps, Theme } from "@mui/material";

export type InputType = "card" | "date" | "money" | "number" | "password" | "text" | string;

export type InputAdapterProps = {
	defaultValue?: string;
	disabled?: boolean;
	endIcon?: React.ReactNode;
	error?: boolean;
	focused?: boolean;
	helperText?: string;
	icon?: React.ReactNode;
	inputProps?: InputProps;
	isRequired?: boolean;
	label?: string;
	muiTextFieldProps?: TextFieldProps;
	onChange?: (value: string) => void;
	placeholder?: string;
	size?: Size;
	success?: boolean;
	sx?: SxProps;
	type?: InputType;
	maxLength?: number;
	security?: boolean;
	inputMode?: any;
	dir?: "rtl" | "ltr"
};

type Size = "lg" | "md" | "sm";

export type Styles = {
	error: boolean;
	size: Size;
	success: boolean;
	theme: Theme;
};
