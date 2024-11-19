import { FormLabel, Grid, Typography } from "@mui/material";

import type { Props } from "./types";

import { LargeSwitch } from "./LargeSwitch";
import { SmallSwitch } from "./SmallSwitch";

export function SwitchAdapter(props: Props) {
	const { type = "large", checked, onChange, label, spaceBetween, switchProps } = props;

	return (
		<Grid
			alignItems={"center"}
			container
			gap={"8px"}
			justifyContent={spaceBetween ? "space-between" : "initial"}
		>
			<FormLabel>
				<Typography variant="bodySm">{label}</Typography>
			</FormLabel>
			{type === "large" ? (
				<LargeSwitch
					checked={checked}
					onChange={onChange}
					{...switchProps}
				/>
			) : (
				<SmallSwitch
					checked={checked}
					onChange={onChange}
					value={checked}
					{...switchProps}
				/>
			)}
		</Grid>
	);
}
