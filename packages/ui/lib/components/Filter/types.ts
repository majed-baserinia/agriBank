export type Props<T extends Record<any, unknown>> = {
	data: T[];
	filters: FilterType<T>[];
	getFilteredData: (filteredData: T[]) => void;
};

export type DropDownItem = { key: string; selected: boolean; value: string };

export type FilterType<T> = {
	filterFunction?: (list: T[], selectedValue: string) => T[];
	filterTitle: string;
	label: string;
	list: DropDownItem[];
};
