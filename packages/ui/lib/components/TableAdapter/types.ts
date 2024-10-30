import type { ReactNode } from "react";

export type Column<TColumnNames extends string> = {
	id: TColumnNames;
	label: string;
	minWidth: number;
	align?: "left" | "right" | "center" | "inherit" | "justify";
};

type Row<TColumnNames extends string> = Partial<Record<TColumnNames, string | ReactNode | number>>;

export type Props<TColumnNames extends string> = {
	columns: Column<TColumnNames>[];
	rowsData?: Row<TColumnNames>[];
};
