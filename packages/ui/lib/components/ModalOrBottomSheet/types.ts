import type { PaperProps } from "@mui/material";
import type { ReactNode } from "react";

export type Props = {
	breackpoint: "lg" | "md" | "sm" | "xs";
	children: ReactNode;
	ModalpaperProps?: PaperProps;
	open: boolean;
	setOpen: (value: boolean) => void;
	snapPoints?: number[];
	title: string;
};
