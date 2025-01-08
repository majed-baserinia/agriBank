import { useAppStore } from "$/stores/app";
import { Box, Grid2, Typography } from "@mui/material";

export function Result() {
	const settings = useAppStore();
	const environmentUser = settings.user[settings.environment];
	return (
		<Grid2
			container
			flexDirection={"column"}
		>
			<Box>
				<Typography variant="bodyLg">id token:</Typography>
				<pre className="max-w-[30ch] whitespace-pre-wrap break-words md:max-w-[90ch] lg:max-w-[120ch]">
					{environmentUser.output?.login?.idToken}
				</pre>
			</Box>
			<Box>
				<Typography variant="bodyLg">refresh token:</Typography>
				<pre>{environmentUser.output?.login?.refreshToken}</pre>
			</Box>
		</Grid2>
	);
}
