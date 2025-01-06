import { ButtonAdapter } from "$lib/components/ButtonAdapter";
import { PaperAdapter } from "$lib/components/PaperAdapter";
import ErrorIcon from "@mui/icons-material/Error";
import { Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { Props } from "./types";

export function GenericError({ title, message, reset }: Props) {
	const { t } = useTranslation("base");
	return (
		<PaperAdapter muiPaperProps={{ sx: { width: "100%", height: "100%" } }}>
			<Grid2
				container
				gap={20}
				flexDirection={"column"}
			>
				<Grid2
					container
					gap={10}
					alignItems={"center"}
					flexDirection={"row"}
				>
					<ErrorIcon
						color="error"
						sx={{
							fontSize: "3.2rem"
						}}
					/>
					<Typography variant="h1Md">{title}</Typography>
				</Grid2>
				<Typography variant="h1Sm">{message}</Typography>
				<ButtonAdapter
					onClick={() => reset?.()}
					variant="contained"
					muiButtonProps={{
						sx: {
							width: "15rem",
							marginTop: "2rem"
						}
					}}
				>
					{t("go-back")}{" "}
				</ButtonAdapter>
			</Grid2>
		</PaperAdapter>
	);
}
