import type { TextFieldProps } from "@mui/material";

export type TextareaAdapterProps = {
	defaultValue?: string;
	disabled?: boolean;
	error?: boolean;
	helperText?: string;
	inputProps?: object;
	isRequired?: boolean;
	label: string;
	muiTextFieldProps?: TextFieldProps;
	onChange: (value: string) => void;
	placeholder?: string;
	rows?: number;
	success?: boolean;
	sx?: object;
};
