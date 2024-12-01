import type { ReactNode } from "react";

import alertIcon from "$assets/icons/input/alertIcon.svg";
import sucIcon from "$assets/icons/input/successIcon.svg";
import { isInputTypeNumeric } from "$components/InputAdapter/utils";
import { SvgToIcon } from "$components/SvgToIcon";
import { InputAdornment, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import type { InputAdapterProps } from "./types";

import { useFormatter } from "./useFormatter";

const heightSizeList = {
	sm: "40px",
	md: "48px",
	lg: "56px"
};

export function InputAdapter(props: InputAdapterProps) {
	const {
		placeholder,
		disabled = false,
		sx,
		isRequired = false,
		label,
		icon,
		endIcon,
		type = "text",
		defaultValue = "",
		onChange,
		muiTextFieldProps,
		inputProps,
		error = false,
		success = false,
		size = "md",
		helperText,
		focused,
		maxLength
	} = props;

	const theme = useTheme();
	const [value, setValue] = useState("");
	const [shrink, setShrink] = useState(defaultValue ? true : false);
	const format = useFormatter({ type });
	const [internalEndIcon, setInternalEndIcon] = useState<ReactNode>(null);

	useEffect(() => {
		const defVal = format(defaultValue).formatted;

		setValue(defVal);
		if (defVal) {
			setShrink(true);
		}

		setInternalEndIcon(
			success ? (
				<SvgToIcon
					alt="success"
					icon={sucIcon}
				/>
			) : error ? (
				<SvgToIcon
					alt="error"
					icon={alertIcon}
				/>
			) : (
				endIcon
			)
		);
	}, [success, error, defaultValue, endIcon]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const result = format(event.target.value);
		const lengthDiff = result.formatted.length - result.original.length;

		const cursorPosition = event.target.selectionStart;

		// move the cursor if there are any changes
		requestAnimationFrame(() => {
			event.target.setSelectionRange(
				(cursorPosition as number) + lengthDiff,
				(cursorPosition as number) + lengthDiff
			);
		});

		setValue(result.formatted);
		onChange(type === "card" || type === "money" ? result.numeric : result.formatted);
	};

	const labelStyle = () => {
		const Y = {
			sm: "8px",
			md: "12px",
			lg: "15px"
		};

		if (shrink) return;

		const directionOffsetX = icon
			? theme.direction === "rtl"
				? -40
				: 40
			: theme.direction === "rtl"
				? -15
				: 15;

		return { transform: `translate(${directionOffsetX}px, ${Y[size]})` };
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
				shrink: shrink,
				style: labelStyle()
			}}
			InputProps={{
				inputProps: {
					inputMode: isInputTypeNumeric(type) ? "numeric" : undefined,
					className: `${isInputTypeNumeric(type) && theme.direction === "rtl" ? "text-right" : ""}`,
					...(isInputTypeNumeric(type) && theme.direction === "rtl" ? { dir: "ltr" } : {})
					maxLength: maxLength
				},
				sx: {
					input: {
						color:
							theme.palette.mode === "dark" ? theme.palette.text.primary : theme.palette.grey[400]
					}
				},
				startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : null,
				endAdornment:
					error || success || endIcon ? (
						<InputAdornment position="end">{internalEndIcon}</InputAdornment>
					) : null,
				...inputProps
			}}
			inputRef={(input: HTMLInputElement) => {
				if (input && focused) {
					input.focus();
				}
			}}
			label={
				label ? (
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
				) : undefined
			}
			onBlur={() => (value ? setShrink(true) : setShrink(false))}
			onChange={handleChange}
			onFocus={() => setShrink(true)}
			placeholder={placeholder}
			size="medium"
			sx={{
				"& .MuiOutlinedInput-root": {
					height: heightSizeList[size]
				},
				"& .MuiOutlinedInput-root fieldset": {
					borderWidth: success || error ? "2px" : "1px",
					borderColor: success ? theme.palette.success[400] : null
				},

				...sx
			}}
			type={type === "password" ? "password" : "text"}
			value={value}
			variant="outlined"
			{...muiTextFieldProps}
		/>
	);
}
