import type { PaperProps } from "@mui/material";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type Props = {
	breakpoint: "lg" | "md" | "sm" | "xs";
	children: ReactNode;
	ModalPaperProps?: PaperProps;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};
