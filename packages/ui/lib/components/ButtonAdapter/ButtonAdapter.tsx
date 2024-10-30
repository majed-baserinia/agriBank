import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";

import type { ButtonAdapterProps } from "./types";

export function ButtonAdapter(props: ButtonAdapterProps) {
	const {
		variant,
		size,
		disabled,
		backIcon,
		forwardIcon,
		startIcon,
		endIcon,
		children,
		onClick,
		muiButtonProps
	} = props;
	const theme = useTheme();

	return (
		<Button
			disabled={disabled}
			variant={variant}
			size={size}
			disableRipple
			onClick={(e) => onClick(e)}
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
			{...muiButtonProps}
		>
			{children}
		</Button>
	);
}
