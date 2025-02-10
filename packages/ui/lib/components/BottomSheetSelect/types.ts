export type Props<T extends { name: string; value: string }> = {
	breakpoint?: "lg" | "md" | "sm" | "xs";
	defaultValue?: string;
	error?: boolean;
	helperText?: string;
	isRequired?: boolean;
	label: string;
	list: T[];
	onChange: (item: T) => void;
};
