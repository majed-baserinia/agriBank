import type { ReactNode, SyntheticEvent } from "react";
export type Props = {
	expanded?: boolean;
	id: string;
	onChange?: (e: SyntheticEvent<Element, Event>, id: string) => void;
	summery?: ReactNode;
	details?: ReactNode;
};
