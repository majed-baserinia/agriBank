import type { ReactNode, SyntheticEvent } from "react";
export type Props = {
	details?: ReactNode;
	expanded?: boolean;
	id: string;
	onChange?: (e: SyntheticEvent<Element, Event>, id: string) => void;
	summery?: ReactNode;
};
