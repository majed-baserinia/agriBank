import type { Dispatch, ReactNode, SetStateAction } from "react";

export type AppAlert = {
	type: "success" | "info" | "warning" | "error";
	messageText?: string | ReactNode;
	hasConfirmAction?: boolean;
	confirmButtonText?: string;
	hasContinueAction?: boolean;
	hasRefuseAction?: boolean;
	actions?: AlertActions;
	overrideActions?: (props: AccessApi) => ReactNode;
};

type AlertActions = {
	onRefuse?: () => void;
	onCloseModal?: () => void;
	onConfirm?: () => void;
	onContinue?: () => void;
};

type AccessApi = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	clearAlerts: () => void;
};
