import type { SxProps } from "@mui/material";

export type Props = {
	className?: string;
	defaultValue?: string;
	error?: boolean;
	helperText?: string;
	label?: string;
	onChange?: (value: string) => void;
	sx?: SxProps;
};
