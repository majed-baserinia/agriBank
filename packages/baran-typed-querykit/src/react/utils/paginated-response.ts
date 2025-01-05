import type { useBaranInfiniteQuery } from "$/react/hooks/useBaranInfiniteQuery";
import type { Response } from "$/react/hooks/useStandardBaranInfiniteQuery";
import type { InfiniteData } from "@tanstack/react-query";
import type { SyntheticEvent } from "react";

export function concatPaginatedResponse<TData extends Response>(
	response: InfiniteData<TData> | undefined
): TData[];
export function concatPaginatedResponse<TData extends Response, TModifiedData extends Array<any>>(
	response: InfiniteData<TData> | undefined,
	modifier: (page: TData) => TModifiedData
): TModifiedData;
export function concatPaginatedResponse<
	TData extends Response,
	TModifiedData extends Array<any> = Array<any>
>(response: InfiniteData<TData> | undefined, modifier?: (page: TData) => TModifiedData) {
	return (
		response?.pages
			.toSorted((a, b) => a.response!.metaData!.currentPage! - b.response!.metaData!.currentPage!)
			.reduce((prev, current) => {
				return prev.concat(modifier?.(current) ?? current);
			}, [] as unknown[]) ?? []
	);
}

export function hasNextPaginatedPage<TData extends Response>(
	response: InfiniteData<TData> | undefined,
	currentPageNumber: number
) {
	return (
		response?.pages.find((page) => page.response?.metaData?.currentPage === currentPageNumber)
			?.response?.metaData?.hasNext === true
	);
}

export async function fetchNextPageBasedOnScroll<TData extends Response>(
	event: SyntheticEvent,
	query: ReturnType<typeof useBaranInfiniteQuery<TData>>
) {
	if (!event.target) {
		return;
	}

	if (query.isFetching) {
		return;
	}

	if (!query.hasNextPage) {
		return;
	}

	const element = event.target as HTMLElement;
	if (element.scrollTop >= element.scrollHeight - element.offsetHeight - 10) {
		await query.fetchNextPage();
	}
}
