export function createTestIdSelector(id: string) {
	return `[data-testid="${id}"]`;
}

export function createTestIdSelectorForAgriComponent(name: string) {
	return createTestIdSelector(`agribank-ui-${name}`);
}

export function createTestIdForAgriComponent(name: string) {
	return `agribank-ui-${name}`;
}
