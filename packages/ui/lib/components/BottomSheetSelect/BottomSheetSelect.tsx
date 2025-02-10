import {
	Divider,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	useMediaQuery,
	useTheme
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Sheet from "react-modal-sheet";

import type { Props } from "./types";

export function BottomSheetSelect<T extends { name: string; value: string }>(props: Props<T>) {
	const {
		list,
		label,
		breakpoint = "sm",
		defaultValue = "",
		onChange,
		isRequired,
		error,
		helperText
	} = props;

	const theme = useTheme();
	const isMatched = useMediaQuery(theme.breakpoints.down(breakpoint));
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	const handleClickItem = (item: T) => {
		setValue(item.value);
		onChange(item);
		setOpen(false);
	};

	return (
		<>
			<FormControl fullWidth>
				<InputLabel id="label">
					{
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
				</InputLabel>
				<Select
					error={error}
					label={label}
					labelId="label"
					sx={{ padding: "0px" }}
					MenuProps={{
						sx: {
							display: isMatched ? "none" : "initial"
						}
					}}
					onChange={() => {}}
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					open={open}
					value={value}
				>
					{list.map((item, index) => {
						return (
							<MenuItem
								key={`${item.value}-${index}`}
								onClick={() => handleClickItem(item)}
								value={item.value}
							>
								<Typography
									variant="bodyMd"
									sx={{
										fontWeight: "medium"
									}}
								>
									{item.name}
								</Typography>
							</MenuItem>
						);
					})}
				</Select>
				{helperText ? <FormHelperText error={error}>{helperText}</FormHelperText> : null}
			</FormControl>
			{isMatched ? (
				<Sheet
					isOpen={open}
					onClose={() => setOpen(false)}
					snapPoints={[450, 0]}
				>
					<Sheet.Backdrop
						onTap={() => {
							setOpen(false);
						}}
					/>
					<Sheet.Container
						style={{
							backgroundColor: theme.palette.background.paper
						}}
					>
						<Sheet.Header />
						<Sheet.Content>
							{
								<Grid sx={{ overflow: "auto" }}>
									{list.map((item, index) => {
										return (
											<Fragment key={`${item.value}-${index}`}>
												<MenuItem
													key={`${item.value}-${index}`}
													onClick={() => handleClickItem(item)}
													value={item.value}
												>
													<Typography
														variant="bodyMd"
														sx={{
															fontWeight: "medium"
														}}
													>
														{item.name}
													</Typography>
												</MenuItem>
												<Divider />
											</Fragment>
										);
									})}
								</Grid>
							}
						</Sheet.Content>
					</Sheet.Container>
					<Sheet.Backdrop />
				</Sheet>
			) : null}
		</>
	);
}
