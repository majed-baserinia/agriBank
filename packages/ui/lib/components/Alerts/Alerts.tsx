import { ButtonAdapter } from "$lib/components/ButtonAdapter/ButtonAdapter";
import { type AppAlert, clearAlert, useAlert } from "$lib/stores/alerts";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Icon } from "./Icon";

export function Alerts() {
	const { alerts } = useAlert();
	const { t } = useTranslation("base");
	const [open, setOpen] = useState(true);
	const [localAlerts, setLocalAlerts] = useState<AppAlert[]>([]);
	const capturedAlert = localAlerts[0];
	const theme = useTheme()

	useEffect(() => {
		setLocalAlerts([...alerts]);
		if (alerts.length) {
			setOpen(true);
		}
	}, [alerts]);

	const clearAlerts = () => {
		clearAlert();
		setLocalAlerts([]);
	};

	const handleClose = () => {
		setOpen(false);
		clearAlerts();
		capturedAlert?.actions?.onCloseModal?.();
	};

	return localAlerts.length > 0 ? (
		<Dialog
			fullWidth
			maxWidth={"xs"}
			onClose={() => handleClose()}
			open={open}
			PaperProps={{
				sx: { padding: "20px", borderRadius: "24px" }
			}}
			// eslint-disable-next-line no-loss-of-precision
			sx={{ zIndex: 9999999999999999 }}
			data-testid="agribank-ui-alerts"
		>
			<Grid
				container
				sx={{
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Icon type={capturedAlert.type} />
			</Grid>
			<DialogTitle sx={{ margin: "auto" }}>
				<Typography
					variant="bodyLg"
					sx={{
						fontWeight: "bold"
					}}
				>
					{t(capturedAlert.type)}
				</Typography>
			</DialogTitle>

			<DialogContent sx={{ margin: "auto" }}>
				{typeof capturedAlert.messageText === "string" ? (
					<Typography
						sx={{ textAlign: "center" }}
						variant="bodySm"
						data-testid="agribank-ui-alerts-text"
					>
						{capturedAlert.messageText}
					</Typography>
				) : (
					capturedAlert?.messageText
				)}
			</DialogContent>

			<DialogActions sx={{ justifyContent: "center" }}>
				{capturedAlert.overrideActions ? (
					capturedAlert.overrideActions({ open, setOpen, clearAlerts })
				) : (
					<>
						{capturedAlert?.hasConfirmAction ? (
							<ButtonAdapter
								onClick={() => {
									setOpen(false);
									clearAlerts();
									capturedAlert?.actions?.onConfirm?.();
								}}
								variant={capturedAlert?.variantConfirm}
								muiButtonProps={{
									color: theme.palette.primary.main,
									backgroundColor: theme.palette.primary.main,
								}}
							>
								{capturedAlert.confirmButtonText
									? capturedAlert.confirmButtonText
									: t("i-understand")}
							</ButtonAdapter>
						) : null}
						{capturedAlert?.hasContinueAction ? (
							<ButtonAdapter
								onClick={() => {
									setOpen(false);
									clearAlerts();
									capturedAlert.actions?.onContinue?.();
								}}
								variant={"outlined"}
							>
								{t("continue")}
							</ButtonAdapter>
						) : null}
						{capturedAlert?.hasRefuseAction ? (
							<ButtonAdapter
								onClick={() => {
									setOpen(false);
									clearAlerts();
									capturedAlert.actions?.onRefuse?.();
								}}
								variant={"outlined"}
							>
								{t("refuse")}
							</ButtonAdapter>
						) : null}
					</>
				)}
			</DialogActions>
		</Dialog>
	) : undefined;
}
