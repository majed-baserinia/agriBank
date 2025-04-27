import { FormControlLabel, Radio, Typography, useTheme } from "@mui/material";

import type { Props } from "./types";

export function RadioButtonAdapter(props: Props) {
	const { value, label, checked, onChange, disabled, MuiProps } = props;
	const theme = useTheme();

	return (
		<FormControlLabel
			control={
				<Radio
					checked={checked}
					onChange={onChange}
				/>
			}
			disabled={disabled}
			label={
				<Typography
					variant="bodyMd"
					sx={{
						fontWeight: "medium"
					}}
				>
					{label}
				</Typography>
			}
			labelPlacement="end"
			sx={[
				{
					padding: "8px",
					borderRadius: "16px",
					marginRight: "unset",
					marginLeft: "unset",
					width: "100%"
				},
				checked
					? {
						border: `1px solid ${theme.palette.primary.main}`
					}
					: {
						border: `1px solid ${theme.palette.grey[200]}`
					},
				{ ...MuiProps }
			]}
			value={value}
		/>
	);
}
