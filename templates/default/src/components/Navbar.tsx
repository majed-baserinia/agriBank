import { Grid2, Link } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";

export function Navbar() {
	return (
		<Grid2
			container
			flexDirection={"row"}
			gap={20}
			padding={5}
			marginBottom={10}
		>
			<Link
				component={"span"}
				variant="h6"
			>
				<RouterLink to="/">home</RouterLink>
			</Link>

			<Link
				component={"span"}
				variant="h6"
			>
				<RouterLink to="/service-call">service call</RouterLink>
			</Link>
		</Grid2>
	);
}
