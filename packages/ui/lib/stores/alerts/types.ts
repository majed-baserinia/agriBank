import type { Dispatch, ReactNode, SetStateAction } from "react";

export type AppAlert = {
	actions?: AlertActions;
	confirmButtonText?: string;
	hasConfirmAction?: boolean;
	hasContinueAction?: boolean;
	hasRefuseAction?: boolean;
	messageText?: ReactNode | string;
	overrideActions?: (props: AccessApi) => ReactNode;
	type: "error" | "info" | "success" | "warning" | "phone-voice-otp" | "phone-sms-otp";
	variantConfirm?: "text" | "contained" | "outlined";
	colorConfirm?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
};

type AlertActions = {
	onCloseModal?: () => void;
	onConfirm?: () => void;
	onContinue?: () => void;
	onRefuse?: () => void;
};

type AccessApi = {
	clearAlerts: () => void;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};
