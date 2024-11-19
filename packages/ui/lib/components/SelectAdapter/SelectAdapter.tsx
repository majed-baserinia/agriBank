import type { SelectChangeEvent } from "@mui/material";
import type { ReactElement, ReactNode, SyntheticEvent } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
	FormControl,
	FormHelperText,
	Grid,
	InputAdornment,
	InputLabel,
	Select,
	useMediaQuery,
	useTheme
} from "@mui/material";
import { useEffect, useState } from "react";

import type { Props } from "./types";

export function SelectAdapter(props: Props) {
	const {
		onChange,
		label,
		error,
		helperText,
		disabled,
		icon,
		children,
		defaultValue = "",
		muiSelectProps,
		size = "medium",
		renderValue = false,
		isRequired = false
	} = props;
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setSelectedValue(defaultValue);
	}, [defaultValue]);

	//const handleChange = (event:ChangeEvent<{ value: unknown}>) => {

	const handleChange = (e: SelectChangeEvent<unknown>, child: ReactNode) => {
		if ((child as ReactElement).type == "div") {
			setOpen(true);
		} else {
			setSelectedValue(e.target.value as string);
			onChange(e.target.value as string);
		}
	};

	const handleClickedItem = (e: SyntheticEvent<Element, Event>) => {
		//check if the user is clicking on buttons  inside the select
		const clickedItemTagName = e.currentTarget.tagName.toLowerCase();
		const clickedItemClassName = e.currentTarget.className;

		if (clickedItemTagName === "div" && clickedItemClassName === "clickedNotClose") {
			setOpen(true);
		} else {
			setOpen(false);
		}
	};

	const gridStyle = {
		position: "fixed",
		top: "0",
		left: "0",
		right: "0",
		bottom: "0",
		zIndex: "99999999999",
		padding: "16px",
		height: window.innerHeight + "px",
		width: "100%",
		backgroundColor: theme.palette.background.paper
	};

	const menuStyle = {
		"& .MuiMenu-list": {
			backgroundColor: theme.palette.background.paper,
			height: "100%",
			minWidth: "100%",
			boxShadow: "none",
			zIndex: "999999999999"
		},
		"& .MuiMenu-paper": {
			backgroundColor: theme.palette.background.paper,
			height: "100%",
			minWidth: "100%",
			boxShadow: "none",
			zIndex: "999999999999"
		}
	};

	return (
		<Grid
			container
			flexDirection={"column"}
			justifyContent={"space-between"}
			sx={{ ...(open && matches ? gridStyle : {}), transition: "width 0.2s ease-out" }}
		>
			<FormControl
				fullWidth
				size={size}
			>
				{label ? <InputLabel id="label">{label}</InputLabel> : null}
				<Select
					// we need one more rerender to apply the new styles correctly
					// the key props is for forcing a rerender
					key={`${open}-${matches}`}
					labelId="label"
					size={size}
					{...muiSelectProps}
					dir={theme.direction}
					disabled={disabled}
					error={error}
					IconComponent={KeyboardArrowDownIcon}
					inputProps={{
						renderValue: renderValue ? (option: string) => option : undefined
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
					MenuProps={{
						disablePortal: true,
						dir: theme.direction,
						sx: matches ? menuStyle : null,
						PaperProps: {
							style: {
								maxWidth: "200px",
								overflowX: "auto",
								cursor: "pointer",
								padding: !matches ? "0 8px" : "inherit"
							}
						}
					}}
					onChange={(e, child) => handleChange(e, child)}
					onClose={(e) => handleClickedItem(e)}
					onOpen={() => setOpen(true)}
					open={open}
					startAdornment={
						icon ? <InputAdornment position="start">{icon}</InputAdornment> : undefined
					}
					sx={{ "& .MuiSvgIcon-root": { color: theme.palette.grey[400] } }}
					value={selectedValue}
				>
					{children}
				</Select>
				<FormHelperText error={error}>{helperText}</FormHelperText>
			</FormControl>
		</Grid>
	);
}
