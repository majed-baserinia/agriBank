import type { AutocompleteRenderInputParams } from "@mui/material";

import { CircularProgress, TextField, useTheme } from "@mui/material";
import { type FocusEvent, type MouseEvent, useState } from "react";
import type { RenderInputProps } from "./types";

export function RenderInput(props: {
	additionalProps: RenderInputProps;
	params: AutocompleteRenderInputParams;
}) {
	const { additionalProps, params } = props;
	const { error, label, isRequired, helperText, inputMode, loading, inputRef, icon, maxLength, letterSpacing } = additionalProps;
	const theme = useTheme();
	const [focusedCounter, setFocusedCounter] = useState(0);

	return (
		<TextField
			{...params}
			dir={inputMode == "numeric" ? "ltr" : theme.direction}
			error={error}
			helperText={helperText}
			inputRef={inputRef}
			inputProps={{
				...params.inputProps,
				inputMode: inputMode,
				pattern: inputMode === "numeric" ? "[0-9]*" : undefined,
				maxLength: maxLength,
				style: {
					letterSpacing: letterSpacing
				},
			}}
			InputProps={{
				...params.InputProps,
				onBlur: (e) => {
					setFocusedCounter(0);
					e.target.blur();
					params.inputProps.onBlur?.(e as FocusEvent<HTMLInputElement, Element>);
				},
				readOnly: focusedCounter < 2,
				onMouseDown: (e) => {
					if (focusedCounter < 2) {
						setFocusedCounter((prev) => ++prev);
					}
					if (focusedCounter === 1) {
						return;
					}
					params.inputProps.onMouseDown?.(e as MouseEvent<HTMLInputElement>);
				},
				startAdornment: icon,
				endAdornment: (
					<>
						{loading ? <CircularProgress color="inherit" size={20} /> : null}
						{params.InputProps.endAdornment}
					</>
				)
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
			type="text"
		/>

	);
}
