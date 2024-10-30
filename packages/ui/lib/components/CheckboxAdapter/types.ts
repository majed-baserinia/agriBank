import type { ReactNode } from "react";

export type Props = {
	disabled?: boolean;
	required?: boolean;
	defaultChecked?: boolean;
	checked: boolean;
	label?: ReactNode;
	onChange: (checked: boolean) => void;
};
