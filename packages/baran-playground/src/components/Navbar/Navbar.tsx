import { NavbarItem } from "$/components/Navbar/NavbarItem";
import { NavbarItemRaw } from "$/components/Navbar/NavbarItemRaw";
import { navigateToActiveApplication } from "$/features/apps";
import { Toggle } from "$/features/environment";
import { useAppStore } from "$/stores";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import MenuIcon from "@mui/icons-material/Menu";
import WebIcon from "@mui/icons-material/Web";
import { Button, Drawer, Grid2, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { useMatch, useNavigate, type NavigateOptions } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

function MicroToolBar({ isOpen }: { isOpen: boolean }) {
	const store = useAppStore();
	const match = useMatch({
		from: "/_layout/$environment/$app/",
		shouldThrow: false
	});

	return (
		<>
			{match && (
				<NavbarItem
					text={"send post-message"}
					title="send post-message"
					isOpen={isOpen}
					onClick={() => {
						store.changeDialogVisibility("opened");
					}}
					icon={<CallToActionIcon />}
				/>
			)}

			<NavbarItemRaw title="toggle environment">
				<Toggle
					sx={{ alignItems: "center", display: "flex" }}
					orientation="vertical"
				/>
			</NavbarItemRaw>
		</>
	);
}

export function MiniDrawer({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	async function changePage(options: NavigateOptions) {
		setIsOpen(false);
		await navigate(options);
	}
	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	return (
		<Box>
			<Box position={"fixed"}>
				<Button onClick={toggleDrawer(true)}>
					<MenuIcon />
				</Button>
			</Box>
			<Grid2
				sx={{
					height: "100vh",
					width: "100vw",
					boxSizing: "border-box"
				}}
				container
			>
				<Drawer
					open={open}
					onClose={toggleDrawer(false)}
				>
					<Paper
						elevation={10}
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							height: "100%"
							// width: "80px",
						}}
					>
						<List sx={{ width: "100%" }}>
							<NavbarItem
								text="close"
								title={"toggle navbar"}
								icon={<MenuIcon />}
								isOpen={isOpen}
								onClick={() => setIsOpen((prev) => !prev)}
							/>
							<NavbarItem
								text="account"
								title="account management"
								icon={<AccountCircleIcon />}
								isOpen={isOpen}
								onClick={() => changePage({ to: "/playground/login" })}
							/>
							<NavbarItem
								text="environment"
								title="environment management"
								icon={<DeviceHubIcon />}
								isOpen={isOpen}
								onClick={() => changePage({ to: "/playground/environment" })}
							/>
							<NavbarItem
								text="application"
								title="application management"
								icon={<AppRegistrationIcon />}
								isOpen={isOpen}
								onClick={() => changePage({ to: "/playground/apps" })}
							/>
							<NavbarItem
								text={"open active application"}
								title="open active application"
								isOpen={isOpen}
								onClick={() => {
									setIsOpen(false);
									void navigateToActiveApplication(navigate);
								}}
								icon={<WebIcon />}
							/>
						</List>
						<Divider />

						<List
							sx={{
								marginTop: "auto",
								justifyContent: "center",
								alignItems: "center",
								boxSizing: "border-box",
								width: "100%"
							}}
						>
							<MicroToolBar isOpen={isOpen} />
						</List>
					</Paper>
				</Drawer>
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
		</Box>
	);
}
