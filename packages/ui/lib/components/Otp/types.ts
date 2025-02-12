import type { Props as AlertProps } from "$lib/components/Alerts/types";
import type { InputAdapterProps } from "$lib/components/InputAdapter";

type SendReturnType = { timer?: number; maxLength?: number } | false;
export type Props = {
	/**
	 * @returns the timer and maxLength and initiates sent-otp state or
	 * false if any error has occurred and you want to cancel the sent-otp state
	 */
	onSendSmsClick: () => SendReturnType | Promise<SendReturnType>;
	sendOnLoad?: boolean;
	label?: string;
	onChange: (value: string) => void;
	agriInputProps?: Partial<InputAdapterProps>;
	alertType?: Partial<AlertProps>;
	alertMessage?: string;
	variant?: "refresh-icon" | "send-button";
};
