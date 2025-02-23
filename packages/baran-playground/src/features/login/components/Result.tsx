import { useCurrentEnvironmentActiveUser } from "$/features/login";
import { Box, Grid2, Typography } from "@mui/material";

export function Result() {
	const user = useCurrentEnvironmentActiveUser();

	return (
		<Grid2
			container
			flexDirection={"column"}
		>
			<Box>
				<Typography
					variant="bodyLg"
					color="secondary"
				>
					id token:
				</Typography>
				<pre className="max-w-[30ch] whitespace-pre-wrap break-words md:max-w-[90ch] lg:max-w-[120ch]">
					{user?.output?.login?.idToken}
				</pre>
			</Box>
			<Box>
				<Typography
					variant="bodyLg"
					color="secondary"
				>
					refresh token:
				</Typography>
				<pre className="max-w-[30ch] whitespace-pre-wrap break-words md:max-w-[90ch] lg:max-w-[120ch]">
					{user?.output?.login?.refreshToken}
				</pre>
			</Box>
		</Grid2>
	);
}
