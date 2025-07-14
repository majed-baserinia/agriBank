import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";

import type { ButtonAdapterProps } from "./types";

export function ButtonAdapter(props: ButtonAdapterProps) {
	const {
		variant = "contained",
		size,
		disabled,
		backIcon,
		forwardIcon,
		startIcon,
		endIcon,
		children,
		onClick,
		muiButtonProps,
		loading
	} = props;
	const theme = useTheme();

	return (
		<Button
			loading={loading}
			loadingPosition="end"
			disabled={disabled}
			disableRipple
			endIcon={
				endIcon ? (
					endIcon
				) : forwardIcon ? (
					theme.direction === "rtl" ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)
				) : null
			}
			onClick={onClick}
			size={size}

			startIcon={
				startIcon ? (
					startIcon
				) : backIcon ? (
					theme.direction === "rtl" ? (
						<ChevronRightIcon />
					) : (
						<ChevronLeftIcon />
					)
				) : null
			}
			variant={variant}

			sx={{
				...(variant === "outlined" && {
					borderWidth: "2px",
					borderStyle: "solid",
					borderColor: theme.palette.primary.main,
					color: theme.palette.primary.main,
					fontWeight: 700,
					fontFamily: "IRANSans"
				}),
				...(variant === "contained" && {
					backgroundColor: theme.palette.primary.main,
					fontFamily: "IRANSans",
					"&:hover": {
						backgroundColor: theme.palette.primary.dark
					}
				}),
				...muiButtonProps?.sx
			}}


		>
			{children}
		</Button>
	);
}
