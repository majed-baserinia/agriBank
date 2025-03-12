import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Grid2, IconButton, List, ListItemButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export type NavigationAction = "next" | "prev";
export type TablePaginationProps = {
	/**
	 * passing -1 means the total size in unknown
	 */
	totalNumberOfItems: number;
	activePageIndex: number;
	onNavigating: (action: NavigationAction) => void;
	/**
	 * @default false
	 */
	disableNextButton?: boolean;
	pagination: {
		/* all possible combinations like [10, 20] meaning it can have 10 or 20 items per page  */
		itemsPerPage: number[];
		/* which pagination option should be selected */
		activeIndex: number;
		onPaginationChanged: (index: number, value: number) => void;
	};
};

export function TablePagination({
	totalNumberOfItems,
	pagination,
	activePageIndex,
	onNavigating,
	disableNextButton = false
}: TablePaginationProps) {
	const { t } = useTranslation("base");
	const activeItemsPerPage = pagination.itemsPerPage[pagination.activeIndex];

	function handleActiveNavigationChanged(value: number, index: number) {
		pagination.onPaginationChanged(value, index);
	}

	return (
		<Grid2
			container
			width={"100%"}
			justifyContent={"space-between"}
			alignItems={"center"}
			marginTop={8}
		>
			<Grid2
				container
				alignItems={"center"}
				gap={8}
			>
				<Typography
					sx={{
						color: (theme) => theme.palette.grey[500],
						fontWeight: 500
					}}
				>
					{totalNumberOfItems && totalNumberOfItems !== -1
						? t("xpage-of-xtotal-pages", {
								xpage: activePageIndex + 1,
								xtotal:
									totalNumberOfItems < activeItemsPerPage
										? 1
										: Math.floor(totalNumberOfItems / activeItemsPerPage)
							})
						: t("xpage-number", {
								xpage: activePageIndex + 1
							})}
				</Typography>
				<Grid2
					container
					gap={8}
					flexDirection={"row"}
					aria-label="actions"
				>
					<IconButton
						disabled={
							disableNextButton ||
							(totalNumberOfItems > 0 &&
								(activePageIndex + 1) * activeItemsPerPage >= totalNumberOfItems)
						}
						sx={{ backgroundColor: (theme) => theme.palette.grey[50] }}
						onClick={() => {
							onNavigating("next");
						}}
					>
						<NavigateNext />
					</IconButton>

					<Grid2
						sx={{
							backgroundColor: (theme) => theme.palette.primary[500],
							color: "white",
							width: "2.5rem",
							height: "2.5rem",
							borderRadius: "50%"
						}}
						container
						justifyContent={"center"}
						alignItems={"center"}
					>
						<Typography>{activePageIndex + 1}</Typography>
					</Grid2>

					<IconButton
						disabled={activePageIndex === 0}
						onClick={() => {
							onNavigating("prev");
						}}
						sx={{ backgroundColor: (theme) => theme.palette.grey[50] }}
					>
						<NavigateBefore />
					</IconButton>
				</Grid2>
			</Grid2>
			<Grid2
				container
				sx={{
					alignItems: "center",
					border: (theme) => `1px solid ${theme.palette.grey[100]}`,
					borderRadius: 8,
					padding: 4,
					width: "fit-content"
				}}
			>
				<Typography padding={8}>{t("no-of-items-per-page")}</Typography>
				<List
					sx={{
						display: "flex",
						flexDirection: "row",
						gap: 8,
						padding: 0
					}}
				>
					{pagination.itemsPerPage.map((value, index) => (
						<ListItemButton
							component={"li"}
							sx={{
								color: (theme) => theme.palette.text.primary,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 8,
								padding: "8px 12px",
								"&.Mui-selected": {
									backgroundColor: (theme) => theme.palette.primary[500],
									color: (theme) => theme.palette.primary.contrastText
								},
								"&:hover":
									0 === index
										? {
												color: (theme) => theme.palette.secondary.light
											}
										: {}
							}}
							selected={pagination.activeIndex === index}
							key={value}
							onClick={() => handleActiveNavigationChanged(value, index)}
						>
							<Typography textAlign={"center"}>{value}</Typography>
						</ListItemButton>
					))}
				</List>
			</Grid2>
		</Grid2>
	);
}
