import { alertBaranError } from "$/react/hooks/baran-error-alert";
import { pushAlert } from "@agribank/ui/stores/alerts";
import { useMutation } from "@tanstack/react-query";

export const useBaranMutation = ((options, queryClient?) => {
	return useMutation(
		{
			...options,
			mutationFn: async (...params) => {
				const result = await options.mutationFn!(...params);

				alertBaranError(result, true);

				return result;
			},
			onError(error, variables, context) {
				options.onError?.(error, variables, context);
				if (
					error &&
					typeof error === "object" &&
					"message" in error &&
					typeof error.message === "string"
				) {
					pushAlert({
						messageText: error.message,
						type: "error"
					});
				}
			}
		},
		queryClient
	);
}) satisfies typeof useMutation;
