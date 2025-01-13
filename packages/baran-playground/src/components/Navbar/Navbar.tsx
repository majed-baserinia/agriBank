import { NavbarItem } from "$/components/Navbar/NavbarItem";
import { NavbarItemRaw } from "$/components/Navbar/NavbarItemRaw";
import { navigateToActiveApplication } from "$/features/apps";
import { Toggle } from "$/features/environment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import MenuIcon from "@mui/icons-material/Menu";
import WebIcon from "@mui/icons-material/Web";
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
						icon={<AppRegistrationIcon />}
						isOpen={isOpen}
						onClick={() => changePage({ to: "/playground/apps" })}
					/>
				</List>
				<Divider />

				<List sx={{ marginTop: "auto" }}>
					<NavbarItem
						text={"open active application"}
						isOpen={isOpen}
						onClick={() => {
							setIsOpen(false);
							void navigateToActiveApplication(navigate);
						}}
						icon={<WebIcon />}
					/>
					<NavbarItemRaw>
						<Toggle orientation="vertical" />
					</NavbarItemRaw>
				</List>
			</Paper>
			<Box
				component="main"
				sx={{
					maxHeight: "100%",
					maxWidth: "100%",
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
