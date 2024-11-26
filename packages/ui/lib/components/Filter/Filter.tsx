import filterIcon from "$assets/icons/filter.svg";
import { ButtonAdapter } from "$components/ButtonAdapter";
import { ChipsAdapter } from "$components/ChipsAdapter";
import { SelectAdapter } from "$components/SelectAdapter";
import { SvgToIcon } from "$components/SvgToIcon";
import { ModalOrBottomSheet } from "$lib/components/ModalOrBottomSheet/ModalOrBottomSheet";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, MenuItem, Paper, Typography } from "@mui/material";
import { useState } from "react";

import type { Props } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Filter<T extends Record<any, unknown>>(props: Props<T>) {
	const { data, filters, getFilteredData } = props;

	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState<string[]>([]);
	const [filtersState, setFiltersState] = useState(filters);

	const handleSelectChange = (label: string, value: string) => {
		setFiltersState((prev) => {
			return prev.map((item) => {
				if (item.label === label) {
					// Create a new list with the updated selected state
					const newList = item.list.map((menuItem) => ({
						...menuItem,
						selected: menuItem.value === value
					}));

					// Return the updated filter item
					return {
						...item,
						list: newList
					};
				}
				return item;
			});
		});
	};

	const handleSubmitFilterButton = () => {
		const selectedItems = [];
		const filteredData = [];
		for (const filter of filtersState) {
			//get selected value
			const selectedItem = filter.list.find((item) => item.selected)?.value;

			//save selected items to show to the user in the input
			selectedItems.push(selectedItem!);

			//filter the values
			const newData = filter.filterFunction?.(data, selectedItem!);

			if (newData) {
				filteredData.push(newData);
			}
		}

		//get the shared data between the filters
		function intersection(arrays: T[][]) {
			if (arrays.length === 0) return [];
			return arrays.reduce((acc, array) => acc.filter((item) => array.includes(item)));
		}

		const finalData = intersection(filteredData);

		//pass data to parent
		getFilteredData(finalData);

		//set the filters name in the input
		setInputValue(selectedItems);
		setOpen(false);
	};

	return (
		<Grid>
			<Grid onClick={() => setOpen(!open)}>
				<Paper
					component="div"
					elevation={0}
					sx={(theme) => ({
						minWidth: "200px",
						display: "flex",
						alignItems: "center",
						padding: "4px",
						border: `1px solid ${theme.palette.grey[100]}`,
						borderRadius: "8px",
						backgroundColor: "inherit"
					})}
				>
					<Grid
						container
						sx={{
							alignItems: "center",
							gap: "4px"
						}}
					>
						<SvgToIcon
							alt="filter"
							icon={filterIcon}
						/>
						<Typography variant="bodySm">فیلتر</Typography>
					</Grid>
					<Grid
						container
						wrap="nowrap"
						sx={{
							alignItems: "center",
							flexDirection: "row",
							gap: "4px"
						}}
					>
						{inputValue.map((item) => {
							return (
								<ChipsAdapter
									icon={<CloseIcon sx={{ width: "20px", height: "20px", margin: "0" }} />}
									key={item}
									label={item}
									onClick={() => {}}
								/>
							);
						})}
					</Grid>
				</Paper>
			</Grid>
			<ModalOrBottomSheet
				breackpoint="sm"
				open={open}
				setOpen={setOpen}
				title="فیلتر"
			>
				<Grid
					container
					direction={"column"}
					sx={{
						gap: "16px"
					}}
				>
					{filtersState.map((filter) => {
						return (
							<Grid
								container
								direction={"column"}
								key={filter.label}
								sx={{
									gap: "8px"
								}}
							>
								<Typography variant="bodySm">{filter.filterTitle}</Typography>
								<SelectAdapter
									defaultValue={filter.list.find((item) => item.selected)?.value}
									label={filter.label}
									onChange={(value) => {
										handleSelectChange(filter.label, value);
									}}
									renderValue
								>
									{filter.list.map((item) => {
										return (
											<MenuItem
												key={item.key}
												value={item.value}
											>
												{item.key}
											</MenuItem>
										);
									})}
								</SelectAdapter>
							</Grid>
						);
					})}
					<ButtonAdapter
						muiButtonProps={{
							sx: { marginTop: "48px" }
						}}
						onClick={handleSubmitFilterButton}
						variant="contained"
					>
						efj
					</ButtonAdapter>
				</Grid>
			</ModalOrBottomSheet>
		</Grid>
	);
}
