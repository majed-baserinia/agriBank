import { z } from "zod";

export const extractKeysFromZod = (schema: z.ZodTypeAny): string[] => {
	// Adjusted: Signature now uses Zod.ZodType to eliminate null& undefined check
	// check if schema is nullable or optional
	if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) {
		return extractKeysFromZod(schema.unwrap() as z.ZodType);
	}
	// check if schema is an array
	if (schema instanceof z.ZodArray) {
		return extractKeysFromZod(schema.element as z.ZodType);
	}
	// check if schema is an object
	if (schema instanceof z.ZodObject) {
		// get key/value pairs from schema
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const entries = Object.entries<z.ZodType>(schema.shape); // Adjusted: Uses Zod.ZodType as generic to remove instanceof check. Since .shape returns ZodRawShape which has Zod.ZodType as type for each key.
		// loop through key/value pairs
		return entries.flatMap(([key, value]) => {
			// get nested keys
			const nested = extractKeysFromZod(value).map((subKey) => `${key}.${subKey}`);
			// return nested keys
			return nested.length ? nested : key;
		});
	}
	// return empty array
	return [];
};
