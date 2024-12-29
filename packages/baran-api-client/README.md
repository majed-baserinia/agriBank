# agribank UI package built with react and MUI

Clients for baran apis that handle the standard baran errors and response models.

# Example usage

raw request model

```typescript
async () => {
	const result = await callApi(async (params) => await postIssueInquiryCheque(params), {
		requestSchema: InquiryIssueChequeBookRequestDetailQuery,
		responseSchema: InquiryChequeBookDetailOutputDto,
		params: {
			customersCartableId: cartableId
		}
	});

	if (result.error) {
		switch (result.error.type) {
			case "InternalError":
			case "UnknownApiError":
			case "ApiError":
				pushAlert({
					type: "error",
					messageText: result.error.message
				});
		}
	}

	return result;
};
```

request with useQuery

```typescript
export function useRequestDetails({ cartableId }: Props) {
	return useQuery({
		queryKey: ["postInquiryissuechequebookrequestdetail", cartableId],
		queryFn: async () => {
			const result = await callApi(
				async (params) => await postInquiryissuechequebookrequestdetail(params),
				{
					requestSchema: InquiryIssueChequeBookRequestDetailQuery,
					responseSchema: InquiryChequeBookDetailOutputDto,
					params: {
						customersCartableId: cartableId
					}
				}
			);

			if (result.error) {
				switch (result.error.type) {
					case "InternalError":
					case "UnknownApiError":
					case "ApiError":
						pushAlert({
							type: "error",
							messageText: result.error.message
						});
				}
			}

			return result;
		}
	});
}
```

with useMutation

```typescript
export function useCancelRequest({ cartableId }: Props) {
	return useMutation({
		mutationFn: async () => {
			const result = await callApiStrict(
				async (params) => await postCancelissuechequebookrequest(params),
				{
					requestSchema: CancelIssueChequeCartableRequestCommand,
					responseSchema: z.boolean(),
					params: {
						customersCartableId: cartableId
					}
				}
			);

			if (result.error) {
				switch (result.error.type) {
					case "InternalError":
					case "UnknownApiError":
					case "ApiError":
						throw new Error(result.error.message);
					case "ClientSideValidationError":
					case "ServerSideValidationError":
						return result;
				}
			}
		},
		onError: (error) => {
			pushAlert({
				messageText: error.message,
				type: "error"
			});
		}
	});
}
```
