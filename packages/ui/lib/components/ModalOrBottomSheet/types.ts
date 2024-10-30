import type { PaperProps } from "@mui/material";
import type { ReactNode } from "react";

export type Props = {
	breackpoint: "md" | "sm" | "lg" | "xs";
	children: ReactNode;
	snapPoints?: number[];
	ModalpaperProps?: PaperProps;
	open: boolean;
	setOpen: (value: boolean) => void;
	title: string;
};
