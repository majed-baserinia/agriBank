import type { SwitchProps } from "@mui/material";
import type { ChangeEvent } from "react";

export type Props = {
	checked: boolean;
	label: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	spaceBetween?: boolean;
	switchProps?: SwitchProps;
	type?: "large" | "small";
};
