import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { clearAlert, useAlert } from "@htsc/ignite";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ButtonAdapter } from "$lib/components/ButtonAdapter/ButtonAdapter";
import { Icon } from "./Icon";
import type { AppAlert } from "@htsc/ignite";

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
			onClose={() => handleClose()}
			open={open}
			PaperProps={{
				sx: { padding: "32px", borderRadius: "24px" }
			}}
			maxWidth={"xs"}
			fullWidth
			// eslint-disable-next-line no-loss-of-precision
			sx={{ zIndex: 9999999999999999 }}
		>
			<Grid
				container
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Icon type={capturedAlert.type} />
			</Grid>
			<DialogTitle sx={{ margin: "auto" }}>
				<Typography
					variant="bodyLg"
					fontWeight={"bold"}
				>
					{t(capturedAlert.type)}
				</Typography>
			</DialogTitle>

			<DialogContent sx={{ margin: "auto" }}>
				{typeof capturedAlert.messageText === "string" ? (
					<Typography
						variant="bodySm"
						sx={{ textAlign: "center" }}
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
									: t("IUnderstand")}
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
