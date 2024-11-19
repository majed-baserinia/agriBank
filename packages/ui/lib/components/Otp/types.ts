export type Props = {
	defaultValue?: string;
	error?: boolean;
	handleResend: () => void;
	helperText?: string;
	label: string;
	maxLength?: number;
	onChange: (value: string) => void;
	timerInSeconds?: {
		timer: number;
	};
};
