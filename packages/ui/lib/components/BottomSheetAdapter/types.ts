import type { ReactNode } from "react";

export type Props = {
	children: ReactNode;
	open: boolean;
	setOpen: (val: boolean) => void;
	snapPoints?: number[];
};
