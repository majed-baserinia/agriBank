import { z } from "zod";

export function createBaranErrorSchema<TRequestSchema extends z.AnyZodObject>(
	requestSchema: TRequestSchema
) {
	return z.object({
		type: z.string(),
		title: z.string(),
		status: z.number(),
		detail: z.string(),
		errors: z
			.preprocess(
				(v) => {
					if (typeof v !== "object" || v === null) {
						return v;
					}
					return Object.entries(v).reduce((prev, [key, value]) => {
						const keys = Object.keys(requestSchema.keyof().Values);
						const target = keys.find(
							(transformedKey) => transformedKey.toLowerCase().trim() === key.toLowerCase().trim()
						);
						return { ...prev, [target ?? key]: value as unknown };
					}, {});
				},
				z.record(
					requestSchema.keyof().optional() as unknown as z.ZodEnum<
						[Exclude<keyof z.infer<TRequestSchema>, number | symbol>]
					>,
					z.string().array()
				)
			)
			.optional()
	});
}

export type BaranErrorSchema<TRequestSchema extends z.AnyZodObject> = ReturnType<
	typeof createBaranErrorSchema<TRequestSchema>
>;

export type BaranError<TRequestSchema extends z.AnyZodObject> = z.infer<
	BaranErrorSchema<TRequestSchema>
>;
