import { Checkbox, FormControlLabel, FormGroup, useTheme } from "@mui/material";
import type { ChangeEvent } from "react";
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
				disabled={disabled}
				required={required}
				control={
					<Checkbox
						sx={{ padding: "0" }}
						size="small"
						onChange={(e) => handleChange(e)}
						checked={checked}
						defaultChecked={defaultChecked}
					/>
				}
				label={label}
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
