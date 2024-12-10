import type { ReactNode } from "react";
import type { NavigationAction } from "./TablePagination";

export type Column<TColumnNames extends string> = {
	id: TColumnNames;
	label?: string;
	minWidth: number;
	align?: "left" | "right" | "center" | "inherit" | "justify";
};

type Row<TColumnNames extends string> = Partial<Record<TColumnNames, string | ReactNode | number>>;

export type Props<TColumnNames extends string> = {
	columns: Column<TColumnNames>[];
	activePageRows: Row<TColumnNames>[] | undefined;
	totalNumberOfItems?: number;
	onNavigating: (action: NavigationAction) => void;
	/**
	 * @default 10
	 */
	itemsPerPage?: number;
	isNextButtonDisabled?: boolean;
	activePageIndex: number;
};
