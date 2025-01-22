import { NavbarItemRaw } from "$/components/Navbar/NavbarItemRaw";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type React from "react";

type Props = {
	title: string;
	text: string;
	icon: React.ReactNode;
	isOpen: boolean;
	onClick?: () => void;
};

export function NavbarItem({ title, text, icon, isOpen, onClick }: Props) {
	return (
		<NavbarItemRaw title={title}>
			<ListItemButton
				sx={{
					justifyContent: "center"
				}}
				onClick={onClick}
			>
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
							paddingLeft: 9
						}}
						primary={text}
					/>
				)}
			</ListItemButton>
		</NavbarItemRaw>
	);
}
