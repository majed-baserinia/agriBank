export function createTestIdSelector(
	id: string,
	options?: {
		isAgriBankComponent?: boolean;
	}
) {
	if (options?.isAgriBankComponent) {
		return `[data-testid="agribank-ui-${id}"]`;
	}
	return `[data-testid="${id}"]`;
}
