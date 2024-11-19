import type { ChangeEvent } from "react";

import { Checkbox, FormControlLabel, FormGroup, useTheme } from "@mui/material";

import type { Props } from "./types";

export function CheckboxAdapter(props: Props) {
	const { disabled, required, defaultChecked, label, checked, onChange } = props;
	const theme = useTheme();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.checked);
	};

	return (
		<FormGroup>
			<FormControlLabel
				control={
					<Checkbox
						checked={checked}
						defaultChecked={defaultChecked}
						onChange={(e) => handleChange(e)}
						size="small"
						sx={{ padding: "0" }}
					/>
				}
				disabled={disabled}
				label={label}
				required={required}
				sx={{
					color: theme.palette.primary.main,
					"&.Mui-checked": {
						color: theme.palette.primary.main
					},
					margin: "initial"
				}}
			/>
		</FormGroup>
	);
}
