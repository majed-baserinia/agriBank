import { NavbarItem } from "$/components/Navbar/NavbarItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppsIcon from "@mui/icons-material/Apps";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid2, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { useNavigate, type NavigateOptions } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

export default function MiniDrawer({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	async function changePage(options: NavigateOptions) {
		setIsOpen(false);
		await navigate(options);
	}

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
						text="close"
						icon={<MenuIcon />}
						isOpen={isOpen}
						onClick={() => setIsOpen((prev) => !prev)}
					/>
					<NavbarItem
						text="account"
						icon={<AccountCircleIcon />}
						isOpen={isOpen}
						onClick={() => changePage({ to: "/playground/login" })}
					/>
					<NavbarItem
						text="environment"
						icon={<DeviceHubIcon />}
						isOpen={isOpen}
						onClick={() => changePage({ to: "/playground/environment" })}
					/>
					<NavbarItem
						text="application"
						icon={<AppsIcon />}
						isOpen={isOpen}
						onClick={() => changePage({ to: "/playground/apps" })}
					/>
				</List>
				<Divider />
			</Paper>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					flexShrink: 0,
					flexBasis: 0,
					p: 0,
					overflowY: "auto",
					overflowX: "hidden",
					boxSizing: "border-box"
				}}
			>
				{children}
			</Box>
		</Grid2>
	);
}
