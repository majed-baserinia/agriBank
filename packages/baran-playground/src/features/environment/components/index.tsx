import { Box, Divider, Typography } from "@mui/material";
import { Details } from "./Details";
import { Toggle } from "./Toggle";

export function Environment() {
	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateRows: "repeat(2, minmax(0, 1fr)",
				gridTemplateColumns: "repeat(2, minmax(0, max-content)"
			}}
		>
			<Typography
				marginBottom={10}
				variant="h1Md"
			>
				Active environment
			</Typography>
			<Toggle />
			<Divider sx={{ marginBottom: 20, marginTop: 20 }} />
			<Typography
				marginBottom={10}
				variant="h1Md"
			>
				Mapped URL
			</Typography>
			<Details />
		</Box>
	);
}

export { Toggle };
