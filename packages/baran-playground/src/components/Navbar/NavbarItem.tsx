import { NavbarItemRaw } from "$/components/Navbar/NavbarItemRaw";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type React from "react";

type Props = {
	text: string;
	icon: React.ReactNode;
	isOpen: boolean;
	onClick?: () => void;
};

export function NavbarItem({ text, icon, isOpen, onClick }: Props) {
	return (
		<NavbarItemRaw>
			<ListItemButton onClick={onClick}>
				<ListItemIcon
					sx={[
						{
							minWidth: 0,
							justifyContent: "center"
						}
					]}
				>
					{icon}
				</ListItemIcon>
				{isOpen && (
					<ListItemText
						sx={{
							paddingLeft: 2
						}}
						primary={text}
					/>
				)}
			</ListItemButton>
		</NavbarItemRaw>
	);
}
