export function createTestId(id: string) {
	return `[data-testid="${id}"]`;
}

export function createTestIdForAgriComponent(name: string) {
	return createTestId(`agribank-ui-${name}`);
}
