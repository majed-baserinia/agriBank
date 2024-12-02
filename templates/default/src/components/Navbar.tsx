import { Grid2, Link } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";

export function Navbar() {
	return (
		<Grid2
			container
			flexDirection={"row"}
			gap={2}
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
				<RouterLink to="/info">service call</RouterLink>
			</Link>
		</Grid2>
	);
}
