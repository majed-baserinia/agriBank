import { ListItem } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
	title: string;
	children: ReactNode;
};

export function NavbarItemRaw({ title, children }: Props) {
	return (
		<ListItem
			title={title}
			disablePadding
			sx={{ display: "block", minHeight: 48, px: 2.5 }}
		>
			{children}
		</ListItem>
	);
}
