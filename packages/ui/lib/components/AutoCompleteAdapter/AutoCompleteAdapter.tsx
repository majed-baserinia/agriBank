import type { AutocompleteInputChangeReason, Theme } from "@mui/material";
import type { SyntheticEvent } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete, Button, Grid, Popper, useMediaQuery, useTheme } from "@mui/material";
import { formatToCardDynamically } from "lib/utils/formatters/formatInput";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Props } from "./types";

import { RenderInput } from "./RenderInput";

// TODO: may need to add card format and functionality to edit card number
// there is already implemented in the chargeAccount repo

//also may need the icons for the card numbers
//this is just a refactored version of that one in the chargeAccount repo
export function AutoCompleteAdapter<T extends Record<any, unknown>>(props: Props<T>) {
	const {
		options,
		label,
		error = false,
		helperText,
		loading = false,
		isRequired = false,
		hasConfirmButton = false,
		renderOption,
		inputMode = "text",
		onChange,
		onInputChange,
		muiButtonProps,
		valueToShowToInput,
		isOptionEqualToValue,
		icon,
		defaultValue,
		type,
		freeSolo = false,
		disable = false
	} = props;

	const { t } = useTranslation("base");
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<null | string | T>(null);
	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef();

	useEffect(() => {
		if (defaultValue !== null || defaultValue !== undefined) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	useEffect(() => {
		//logic for "go back" button on browser to prevent
		if (matches) {
			window.addEventListener("popstate", handlePopState);
		}

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [matches]);

	const handlePopState = (event: PopStateEvent) => {
		event.preventDefault();
		setOpen(false);
	};

	const generateGridStyle = (theme: Theme) => {
		return {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			bottom: "0",
			zIndex: "9",
			padding: "16px",
			height: window.innerHeight + "px",
			backgroundColor: theme.palette.background.paper
		};
	};

	const onChangeHandler = (_: SyntheticEvent<Element, Event>, newValue: null | string | T) => {
		onChange?.(newValue);
		setValue(newValue);

		if (matches && !hasConfirmButton) {
			setOpen(false);
			history.back();
		} else {
			setOpen(false);
		}
	};

	const onInputChangeHandler = (
		event: SyntheticEvent,
		value: string,
		reason: AutocompleteInputChangeReason
	) => {
		const target = event?.target as HTMLInputElement;
		if (reason === "clear" || target?.value === "") {
			setValue(null);
			onChange?.(null);
			setInputValue("");
			onInputChange("");
		} else {
			setInputValue(value);
			onInputChange(value);
		}
	};

	// read the docs in mui
	const getOptionLabel = (option: string | T) => {
		if (type === "card" && typeof option === "string") {
			return formatToCardDynamically(option);
		}

		if (typeof option === "string") {
			return option;
		}

		const { text } = valueToShowToInput(option);
		return text;
	};

	// read the docs in mui
	const isOptionEqualToValueFunction = (option: string | T, value: string | T) => {
		if (typeof option === "string" || typeof value === "string") {
			return option === value;
		} else {
			return isOptionEqualToValue(option, value);
		}
	};

	return (
		<Grid
			container
			sx={[
				{
					flexDirection: "column",
					justifyContent: "space-between"
				},
				open && matches ? { ...generateGridStyle(theme) } : null
			]}
		>
			<Autocomplete
				disabled={disable}
				disablePortal
				freeSolo={freeSolo}
				getOptionLabel={getOptionLabel}
				inputValue={inputValue}
				isOptionEqualToValue={isOptionEqualToValueFunction}
				loading={loading}
				loadingText={t("loading-text-auto-comp")}
				noOptionsText=""
				onChange={onChangeHandler}
				onClose={() => {
					if (!hasConfirmButton) {
						setOpen(false);
					}
				}}
				onInputChange={onInputChangeHandler}
				onOpen={() => {
					if (matches) {
						history.pushState(true, "inputOpen");
					}
					setOpen(true);
				}}
				open={open}
				options={options ?? []}
				popupIcon={<KeyboardArrowDownIcon />}
				renderInput={(params) => (
					<RenderInput
						additionalProps={{
							inputRef: inputRef,
							label: label,
							error: error,
							helperText: helperText,
							inputMode: inputMode,
							isRequired: isRequired,
							loading: loading,
							icon: icon
						}}
						params={params}
					/>
				)}
				renderOption={renderOption}
				value={value}
				slots={{
					popper: (props) => (
						<Popper
							{...props}
							sx={[
								matches
									? {
											boxShadow: 0
										}
									: {
											boxShadow: 3
										}
							]}
						/>
					)
				}}
				slotProps={{
					listbox: {
						component: ListboxComponent
					}
				}}
			/>
			<Grid>
				{matches && open && hasConfirmButton ? (
					<Button
						color="primary"
						onClick={() => {
							if (matches) {
								history.back();
							}
							setOpen(false);
						}}
						sx={{
							zIndex: "110010",
							width: "100%"
						}}
						variant="contained"
						{...muiButtonProps}
					>
						{t("confirm")}
					</Button>
				) : null}
			</Grid>
		</Grid>
	);
}

const ListboxComponent = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
	function ListboxComponent(props, ref) {
		const theme = useTheme();
		const matches = useMediaQuery(theme.breakpoints.down("sm"));
		return (
			<ul
				{...props}
				ref={ref}
				style={{ maxHeight: matches ? "100%" : "40vh" }}
			/>
		);
	}
);
