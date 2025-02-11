import { Chip, Grid, Typography, useTheme } from "@mui/material";

import type { Props } from "./types";

import { CounterIcon } from "./CounterIcon";

export function ChipsAdapter({
	label,
	size = "medium",
	onClick,
	icon = false,
	color = "default",
	count,
	sx,
	variant
}: Props) {
	const theme = useTheme();

	const defaultSx = {
		backgroundColor: variant === "filled" ? theme.palette.primary[50] : "transparent",
		border: `1px solid ${theme.palette.grey[200]}`,
		"&&:hover": {
			backgroundColor: icon ? theme.palette.primary[50] : "transparent",
			border: `1px solid ${icon ? theme.palette.primary.main : theme.palette.grey[200]}`
		},
		".MuiChip-outlined": {
			"& :hover": {
				border: "1px solid red"
			}
		},
		".MuiChip-icon": {
			margin: "0 5px"
		},
		".MuiChip-label": {
			marginTop: "2px"
		},
		"& .MuiChip-deleteIcon": {
			margin: "0 5px"
		}
	};

	return (
		<Chip
			clickable
			color={color}
			deleteIcon={count ? <CounterIcon count={count} /> : undefined}
			dir={theme.direction === "ltr" ? "rtl" : "ltr"}
			icon={icon ? <Grid>{icon}</Grid> : undefined}
			label={<Typography variant="bodySm">{label}</Typography>}
			onClick={(e) => onClick?.(e)}
			onDelete={count ? () => {} : undefined}
			size={size}
			sx={{ ...defaultSx, ...sx }}
			variant="outlined"
		/>
	);
}
