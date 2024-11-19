import type { ReactNode } from "react";

export type Column<TColumnNames extends string> = {
	align?: "center" | "inherit" | "justify" | "left" | "right";
	id: TColumnNames;
	label: string;
	minWidth: number;
};

type Row<TColumnNames extends string> = Partial<Record<TColumnNames, number | ReactNode | string>>;

export type Props<TColumnNames extends string> = {
	columns: Column<TColumnNames>[];
	rowsData?: Row<TColumnNames>[];
};
