import { ListItem } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function NavbarItemRaw({ children }: Props) {
	return (
		<ListItem
			disablePadding
			sx={{ display: "block", minHeight: 48, px: 2.5 }}
		>
			{children}
		</ListItem>
	);
}
