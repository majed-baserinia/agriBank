import { useBaranInfiniteQuery } from "$/react/hooks/useBaranInfiniteQuery";
import type { Result } from "$/types";
import type {
	DefaultError,
	InfiniteData,
	QueryClient,
	QueryKey,
	UndefinedInitialDataInfiniteOptions
} from "@tanstack/react-query";
import { z } from "zod";

const metaData = z.object({
	pageSize: z.number().optional(),
	currentPage: z.number().optional(),
	totalPages: z.number().optional(),
	totalCount: z.number().optional(),
	hasPrevious: z.boolean().optional(),
	hasNext: z.boolean().optional(),
	hasPages: z.boolean().optional()
});
const _data = z.object({
	items: z.union([z.array(z.any()), z.null()]).optional(),
	metaData: metaData.optional()
});

export type Response = Result<z.AnyZodObject, typeof _data>;

/**
 * handles the `getNextPageParam` internally
 */
export const useStandardBaranInfiniteQuery = <
	TQueryFnData extends Response,
	TError = DefaultError,
	TData = InfiniteData<TQueryFnData>,
	TQueryKey extends QueryKey = QueryKey
>(
	options: Omit<
		UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, number>,
		"getNextPageParam"
	>,
	queryClient?: QueryClient
) => {
	return useBaranInfiniteQuery<TQueryFnData, TError, TData, TQueryKey, number>(
		{
			...options,
			getNextPageParam: (lastPage, allPages) => {
				const nextPageNumber = lastPage ? (lastPage.response?.metaData?.currentPage ?? 0) + 1 : 1;
				const alreadyFetchedNextPage = allPages.find(
					(page) => page.response?.metaData?.currentPage === nextPageNumber
				);

				if (alreadyFetchedNextPage && (alreadyFetchedNextPage.response?.items?.length ?? 0) === 0) {
					return undefined;
				}

				if (
					allPages
						.toSorted(
							(a, b) => a.response!.metaData!.currentPage! - b.response!.metaData!.currentPage!
						)
						.at(-1)?.response?.metaData?.hasNext === false
				) {
					return undefined;
				}
				return nextPageNumber;
			}
		},
		queryClient
	);
};
