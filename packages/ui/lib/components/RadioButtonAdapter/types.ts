export type Props = {
	checked: boolean;
	disabled?: boolean;
	label: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
};
