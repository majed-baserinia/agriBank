import { Chip, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import "./styles.css";

import type { Props } from "./types";

export function ChipStatusAdapter(props: Props) {
	const { type, label, size } = props;
	const theme = useTheme();
	const { i18n } = useTranslation();
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

	const types = useMemo(
		() => ({
			disabled: {
				backgroundColor: theme.palette.grey[50],
				color: theme.palette.grey[200]
			},

			success: {
				backgroundColor: theme.palette.success[50],
				color: theme.palette.primary[600]
			},
			error: {
				backgroundColor: theme.palette.error[50],
				color: theme.palette.error[600]
			},
			warning: {
				backgroundColor: theme.palette.warning[50],
				color: theme.palette.warning[700]
			},
			info: {
				backgroundColor: theme.palette.info[50],
				color: theme.palette.info[600]
			}
		}),
		[theme]
	);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Check if text is overflowing
		if (container.offsetWidth < container.scrollWidth) {
			setIsOverflowing(true);
		} else {
			setIsOverflowing(false);
		}
	}, []);

	return (
		<Chip
			label={
				<div
					className="moving-text-container"
					ref={containerRef}
					style={{ width: "100%", overflow: "hidden" }}
				>
					<Typography
						className={
							isOverflowing
								? i18n.dir() === "ltr"
									? "moving-text-moveRightToLeft"
									: "moving-text-moveleftToRight"
								: ""
						}
						fontWeight={"medium"}
						variant="bodySm"
					>
						{label}
					</Typography>
				</div>
			}
			size={size}
			sx={{ ...types[type], padding: "8px" }}
			variant="filled"
		/>
	);
}
