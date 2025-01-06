import { useSettingsStore } from "$/stores/settings";
import { Box, Grid2, Typography } from "@mui/material";

export function Result() {
	const settings = useSettingsStore();
	return (
		<Grid2
			container
			flexDirection={"column"}
		>
			<Box>
				<Typography variant="bodyLg">id token:</Typography>
				<pre>{settings.user.output?.login?.idToken}</pre>
			</Box>
			<Box>
				<Typography variant="bodyLg">refresh token:</Typography>
				<pre>{settings.user.output?.login?.refreshToken}</pre>
			</Box>
		</Grid2>
	);
}
