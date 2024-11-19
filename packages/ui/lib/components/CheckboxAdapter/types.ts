import type { ReactNode } from "react";

export type Props = {
	checked: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	label?: ReactNode;
	onChange: (checked: boolean) => void;
	required?: boolean;
};
