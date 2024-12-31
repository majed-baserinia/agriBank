import { alertBaranError } from "$/react/hooks/baran-error-alert";
import { useInfiniteQuery, type SkipToken } from "@tanstack/react-query";

export const useBaranInfiniteQuery = ((options, queryClient?) => {
	if (typeof options.queryFn === "function") {
		return useInfiniteQuery(
			{
				...options,
				queryFn: async (...params) => {
					const result = await (options.queryFn as Exclude<typeof options.queryFn, SkipToken>)(
						...params
					);

					alertBaranError(result);

					return result;
				}
			},
			queryClient
		);
	} else {
		return useInfiniteQuery(
			{
				...options,
				queryFn: options.queryFn
			},
			queryClient
		);
	}
}) as typeof useInfiniteQuery; // TODO: why can't I use satisfies here?
