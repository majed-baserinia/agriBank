import { Grid } from "@mui/material";

import type { Props } from "./types";

export function SvgToIcon({ icon, alt = "", height = "24px", width = "24px" }: Props) {
	return (
		<Grid sx={{ width: width, height: height, flexShrink: 0 }}>
			<img
				alt={alt}
				src={icon}
				style={{ width: "100%", height: "100%", objectFit: "contain" }}
			/>
		</Grid>
	);
}
