import type { ButtonProps } from "@mui/material";
import type { HTMLAttributes, ReactNode, RefObject } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<T extends Record<any, any>> = {
	error?: boolean;
	hasConfirmButton?: boolean;
	helperText?: string;
	inputMode?: "decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url";
	isOptionEqualToValue: (option: NoInfer<T>, value: NoInfer<T>) => boolean;
	isRequired?: boolean;
	label: string;
	loading?: boolean;
	muiButtonProps?: ButtonProps;
	onChange?: (value: null | string | NoInfer<T>) => void;
	onInputChange: (value: string) => void;
	options?: T[];
	renderOption?: (props: HTMLAttributes<HTMLLIElement>, option: string | NoInfer<T>) => ReactNode;
	valueToShowToInput: (option: NoInfer<T>) => { icon?: ReactNode; text: string };
	icon?: ReactNode;
	defaultValue?: string | NoInfer<T>;
	type?: "card";
	freeSolo?: boolean;
	disable?: boolean;
	maxLength?: number
	fullScreen?: boolean
	disableClearable?: boolean
	letterSpacing?: number,
	noOptionsText?: string,
	slotProps?: any
};

export type RenderInputProps = {
	error?: boolean;
	helperText?: string;
	inputMode?: "decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url";
	inputRef: RefObject<undefined>;
	isRequired?: boolean;
	label: string;
	loading?: boolean;
	icon: ReactNode;
	maxLength?: number
	letterSpacing?: number
};
