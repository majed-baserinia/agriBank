import { useAppStore } from "$/stores/app";
import { Typography } from "@mui/material";
import { convert } from "../utils/environment-to-url";

export function Details() {
	const settings = useAppStore();

	return (
		<pre>
			<Typography variant="bodyLg">{convert(settings.environment)}</Typography>
		</pre>
	);
}
