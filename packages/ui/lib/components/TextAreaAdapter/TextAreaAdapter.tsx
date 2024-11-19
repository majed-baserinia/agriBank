import { TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import type { TextareaAdapterProps } from "./types";

export function TextAreaAdapter(props: TextareaAdapterProps) {
	const {
		placeholder,
		disabled = false,
		sx,
		isRequired = false,
		label,
		defaultValue = "",
		onChange,
		muiTextFieldProps,
		inputProps,
		error = false,
		success = false,
		helperText,
		rows = 4
	} = props;

	const theme = useTheme();
	const [value, setValue] = useState(defaultValue);
	const [shrink, setShrink] = useState(defaultValue ? true : false);

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
			setShrink(true);
		}
	}, [defaultValue]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		onChange(event.target.value);
	};

	return (
		<TextField
			autoComplete="off"
			color={success ? "success" : undefined}
			dir={theme.direction}
			disabled={disabled}
			error={error}
			fullWidth
			helperText={helperText}
			InputLabelProps={{
				size: "small",
				shrink: shrink
			}}
			InputProps={{
				dir: theme.direction,
				sx: { input: { color: theme.palette.grey[200] } },

				...inputProps
			}}
			label={
				<>
					{isRequired ? (
						<>
							{label}
							<span style={{ color: theme.palette.error.main }}> *</span>
						</>
					) : (
						label
					)}
				</>
			}
			multiline
			onBlur={() => (value ? setShrink(true) : setShrink(false))}
			onChange={handleChange}
			onFocus={() => setShrink(true)}
			placeholder={placeholder}
			rows={rows}
			size="medium"
			sx={{
				"& .MuiOutlinedInput-root fieldset": {
					borderWidth: success || error ? "2px" : "1px",
					borderColor: success ? theme.palette.success[400] : null
				},
				...sx
			}}
			type={"text"}
			value={value}
			variant="outlined"
			{...muiTextFieldProps}
		/>
	);
}
