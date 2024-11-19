import type { AutocompleteRenderInputParams } from "@mui/material";

import { CircularProgress, TextField, useTheme } from "@mui/material";

import type { RenderInputProps } from "./types";

export function RenderInput(props: {
	aditionalProps: RenderInputProps;
	params: AutocompleteRenderInputParams;
}) {
	const { aditionalProps, params } = props;
	const { error, label, isRequired, helperText, inputMode, loading, inputRef } = aditionalProps;
	const theme = useTheme();

	return (
		<TextField
			{...params}
			dir={theme.direction}
			error={error}
			helperText={helperText}
			InputProps={{
				onBlur: (e) => e.target.blur(),
				inputMode: inputMode,
				...params.InputProps,
				endAdornment: (
					<>
						{loading ? (
							<CircularProgress
								color="inherit"
								size={20}
							/>
						) : null}
						{params.InputProps.endAdornment}
					</>
				)
			}}
			inputRef={inputRef}
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
			type="text"
		/>
	);
}
