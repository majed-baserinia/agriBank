import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Grid2, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

export type NavigationAction = "next" | "prev";
export type Props = {
	/**
	 * passing -1 means the total size in unknown
	 */
	totalNumberOfItems: number;

	itemsPerPage: number;
	activePageIndex: number;
	onNavigating: (action: NavigationAction) => void;

	/**
	 * @default false
	 */
	disableNextButton?: boolean;
};

export function TablePagination({
	totalNumberOfItems,
	itemsPerPage,
	activePageIndex,
	onNavigating,
	disableNextButton = false
}: Props) {
	const { t } = useTranslation("base");

	return (
		<Grid
			container
			width={"100%"}
			justifyContent={"space-between"}
			alignItems={"center"}
			margin={"1rem 0"}
		>
			<Typography
				sx={{
					backgroundColor: (theme) => theme.palette.grey[100],
					color: (theme) => theme.palette.grey[500],
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "8px",
					padding: "4px",
					margin: "0",
					height: "44px",
					width: "83px"
				}}
			>
				{totalNumberOfItems && totalNumberOfItems !== -1
					? t("xpage-of-xtotal-pages", {
							xpage: activePageIndex + 1,
							xtotal: Math.floor(totalNumberOfItems / (activePageIndex + 1 * itemsPerPage))
						})
					: t("xpage-number", {
							xpage: activePageIndex + 1
						})}
			</Typography>
			<Grid2
				container
				gap={10}
				flexDirection={"row"}
				aria-label="actions"
			>
				<IconButton
					disabled={
						disableNextButton ||
						(totalNumberOfItems > 0 && (activePageIndex + 1) * itemsPerPage >= totalNumberOfItems)
					}
					sx={{ backgroundColor: (theme) => theme.palette.grey[50] }}
					onClick={() => {
						onNavigating("next");
					}}
				>
					<NavigateNext />
				</IconButton>

				<Grid
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
				</Grid>

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
		</Grid>
	);
}
