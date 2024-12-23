import { CircularProgress, Grid, TableCell, TableRow, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TablePagination } from "./TablePagination";
import type { Props } from "./type";

export function TableAdapter<TColumnNames extends string>({
	columns,
	activePageRows,
	activePageIndex,
	onNavigating,
	isNextButtonDisabled,
	totalNumberOfItems,
	muiPaperProps,
	muiTableProps,
	itemsPerPage = 10
}: Props<TColumnNames>) {
	return (
		<>
			<Paper
				{...muiPaperProps}
				sx={{ width: "100%", overflow: "hidden", ...muiPaperProps?.sx }}
			>
				<TableContainer {...muiTableProps}>
					<Table
						stickyHeader
						aria-label="sticky table"
					>
						<TableHead>
							<TableRow>
								{columns.map((column, index) => (
									<TableCell
										key={index}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										<Typography
											variant="bodyMd"
											fontWeight={"bold"}
										>
											{column.label ?? ""}
										</Typography>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{activePageRows?.map((row, index) => {
								return (
									<TableRow
										tabIndex={-1}
										key={index}
									>
										{columns.map((column, index) => {
											const value = row[column.id];
											return (
												<TableCell
													key={index}
													align={column.align}
												>
													<Typography
														component={"div"}
														variant="bodyMd"
													>
														{value}
													</Typography>
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					{!activePageRows ? (
						<Grid
							sx={{ width: "100%" }}
							container
							alignContent={"center"}
							justifyContent={"center"}
						>
							<CircularProgress size={"32px"} />
						</Grid>
					) : null}
				</TableContainer>
			</Paper>
			{activePageRows && (
				<TablePagination
					activePageIndex={activePageIndex}
					onNavigating={onNavigating}
					disableNextButton={isNextButtonDisabled}
					itemsPerPage={itemsPerPage}
					totalNumberOfItems={totalNumberOfItems ?? -1}
				/>
			)}
		</>
	);
}
