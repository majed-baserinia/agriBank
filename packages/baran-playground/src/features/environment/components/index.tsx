import { Box, Typography } from "@mui/material";
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
			<Typography variant="bodyLg">active environment:</Typography>
			<Toggle />
			<Typography variant="bodyLg">url:</Typography>
			<Details />
		</Box>
	);
}

export { Toggle };
