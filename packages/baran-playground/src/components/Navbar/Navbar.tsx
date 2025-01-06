import { NavbarItem } from "$/components/Navbar/NavbarItem";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Grid2, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { type ReactNode, useState } from "react";

export default function MiniDrawer({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Grid2
			sx={{
				height: "100vh",
				width: "100vw",
				boxSizing: "border-box"
			}}
			container
		>
			<Paper
				elevation={10}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",

					height: "100%"
				}}
			>
				<List>
					<NavbarItem
						text="open"
						icon={<MenuIcon />}
						isOpen={isOpen}
						onClick={() => setIsOpen((prev) => !prev)}
					/>
					<NavbarItem
						text="login"
						icon={<InboxIcon />}
						isOpen={isOpen}
						onClick={() => setIsOpen((prev) => !prev)}
					/>
				</List>
				<Divider />
			</Paper>
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 3 }}
			>
				{children}
			</Box>
		</Grid2>
	);
}
