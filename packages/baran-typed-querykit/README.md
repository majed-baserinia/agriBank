# baran-types-querykit

Utilities for handling common baran api errors and typing the response models.

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
		queryFn: baranQueryFn({
			fn() {
				return callApi(postInquiryissuechequebookrequestdetail, {
					requestSchema: InquiryIssueChequeBookRequestDetailQuery,
					responseSchema: InquiryIssueChequeBookRequestDetailOutputDto,
					params: {
						customersCartableId: cartableId
					}
				});
			}
		})
	});
}
```

with useMutation

```typescript
export function useCancelRequest() {
	return useMutation({
		mutationFn: baranMutateFn({
			fn(data: z.infer<typeof CancelIssueChequeCartableRequestCommand>) {
				return callApi(postCancelissuechequebookrequest, {
					requestSchema: CancelIssueChequeCartableRequestCommand,
					responseSchema: z.boolean(),
					params: data
				});
			}
		})
	});
```

client side validations and server side validations reside in the `validationError` property (with the type of `requestSchema`).
