import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import type { Props } from "./types";

export function BreadcrumbsAdapter(props: Props) {
	const { breadcrumbs } = props;
	const theme = useTheme();
	const { t } = useTranslation();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));

	if (matches) return null;

	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			dir={theme.direction}
			separator={
				theme.direction == "ltr" ? (
					<NavigateNextIcon fontSize="small" />
				) : (
					<NavigateBeforeIcon fontSize="small" />
				)
			}
			sx={{ marginBottom: "24px" }}
		>
			{breadcrumbs?.map((item, index) => {
				if (breadcrumbs.length - 1 == index) {
					return (
						<Typography
							color="primary"
							key={item.key}
							variant="bodyMd"
							sx={{
								fontWeight: "bold"
							}}
						>
							{t(item.title, item.title)}
						</Typography>
					);
				}
				return (
					<Link
						color="inherit"
						href={item.href}
						key={item.key}
						onClick={(e) => item.onClick?.(e)}
						underline="hover"
					>
						<Typography variant="bodyMd">{t(item.title, item.title)}</Typography>
					</Link>
				);
			})}
		</Breadcrumbs>
	);
}
