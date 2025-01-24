import { Link } from "@agribank/ui/components/Tanstack";
import { Grid2 } from "@mui/material";

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
				variant="h6"
				to={"/"}
			>
				home
			</Link>

			<Link
				variant="h6"
				to={"/service-call"}
			>
				service call
			</Link>
		</Grid2>
	);
}
