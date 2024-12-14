import { ButtonAdapter } from "$lib/components/ButtonAdapter/ButtonAdapter";
import { type AppAlert, clearAlert, useAlert } from "$lib/stores/alerts";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Icon } from "./Icon";

export function Alerts() {
	const { alerts } = useAlert();
	const { t } = useTranslation("base");
	const [open, setOpen] = useState(true);
	const [localAlerts, setLocalAlerts] = useState<AppAlert[]>([]);
	const capturedAlert = localAlerts[0];

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
				sx: { padding: "32px", borderRadius: "24px" }
			}}
			// eslint-disable-next-line no-loss-of-precision
			sx={{ zIndex: 9999999999999999 }}
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
								variant={"contained"}
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
								variant={"contained"}
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
