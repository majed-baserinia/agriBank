import type { TextFieldProps } from "@mui/material";

export type TextareaAdapterProps = {
	placeholder?: string;
	disabled?: boolean;
	sx?: object;
	isRequired?: boolean;
	label: string;
	defaultValue?: string;
	onChange: (value: string) => void;
	muiTextFieldProps?: TextFieldProps;
	inputProps?: object;
	error?: boolean;
	success?: boolean;
	helperText?: string;
	rows?: number;
};
