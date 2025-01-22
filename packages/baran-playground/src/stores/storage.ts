import { createJSONStorage } from "zustand/middleware";

const TYPE_PREFIX = "$$_TYPE_$$/@baran-playground";
const MAP_TYPE = `${TYPE_PREFIX}/MAP` as const;

export function createStorage() {
	return createJSONStorage(() => localStorage, {
		reviver(_, value) {
			if (isCustomSerializedMapType(value)) {
				return new Map(value.data);
			}
			return value;
		},
		replacer(_, value) {
			if (value instanceof Map) {
				return { type: MAP_TYPE, data: Array.from(value.entries()) };
			}
			return value;
		}
	});
}

function isCustomSerializedType(
	value: unknown
): value is { data: unknown; type: `${typeof TYPE_PREFIX}/${string}` } {
	return (
		value !== null &&
		typeof value === "object" &&
		"data" in value &&
		"type" in value &&
		typeof value.type === "string" &&
		value.type.startsWith(TYPE_PREFIX)
	);
}

function isCustomSerializedMapType(
	value: unknown
): value is { data: [any, any][]; type: typeof MAP_TYPE } {
	return isCustomSerializedType(value) && value.type === MAP_TYPE && typeof value.data === "object";
}
