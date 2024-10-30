import type { PaperProps } from "@mui/material";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type Props = {
	breakpoint: "md" | "sm" | "lg" | "xs";
	children: ReactNode;
	ModalPaperProps?: PaperProps;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};
