type SendReturnType = { timer: number; maxLength: number };
export type Props = {
	handleSend: () => SendReturnType | Promise<SendReturnType>;
	sendOnLoad?: boolean;
	label?: string;
	onChange: (value: string) => void;
};
