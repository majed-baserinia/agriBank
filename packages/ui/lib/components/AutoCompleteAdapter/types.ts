import type { ButtonProps } from "@mui/material";
import type { HTMLAttributes, MutableRefObject, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<T extends Record<any, any>> = {
	error?: boolean;
	hasConfirmButton?: boolean;
	helperText?: string;
	inputMode?: "decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url";
	isOptionEqualToValue: (option: T, value: T) => boolean;
	isRequired?: boolean;
	label: string;
	loading?: boolean;
	muiButtonProps?: ButtonProps;
	onChange: (value: null | string | T) => void;
	onInputChange: (value: string) => void;
	options?: T[];
	renderOption?: (props: HTMLAttributes<HTMLLIElement>, option: string | T) => ReactNode;
	valueToShowToInput: (option: T) => { icon?: ReactNode; text: string };
	icon?: ReactNode;
	defaultValue?: string | T;
	type?: "card";
};

export type RenderInputProps = {
	error?: boolean;
	helperText?: string;
	inputMode?: "decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url";
	inputRef: MutableRefObject<undefined>;
	isRequired?: boolean;
	label: string;
	loading?: boolean;
	icon: ReactNode;
};
