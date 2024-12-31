import { alertBaranError } from "$/react/hooks/baran-error-alert";
import type { AnyResult } from "$/types";
import { useQuery, type SkipToken } from "@tanstack/react-query";

export const useBaranQuery = ((options, queryClient?) => {
	if (typeof options.queryFn === "function") {
		return useQuery(
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
		return useQuery(
			{
				...options,
				queryFn: options.queryFn
			},
			queryClient
		);
	}
}) as typeof useQuery satisfies typeof useQuery<AnyResult>;
