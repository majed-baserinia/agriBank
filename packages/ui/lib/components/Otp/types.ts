import type { InputAdapterProps } from "$lib/components/InputAdapter";
import type { Props as alertProps } from "$lib/components/Alerts/types"

type SendReturnType = { timer?: number; maxLength?: number } | false;
export type Props = {
	/**
	 * @returns the timer and maxLength and initiates sent-otp state or
	 * false if any error has occurred and you want to cancel the sent-otp state
	 */
	handleSend: () => SendReturnType | Promise<SendReturnType>;
	sendOnLoad?: boolean;
	label?: string;
	onChange: (value: string) => void;
	agriInputProps?: Partial<InputAdapterProps>;
	showButton?: boolean
	alertType: Partial<alertProps>
	alertMessage?: string
};
