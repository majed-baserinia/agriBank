import { z } from "zod";

export function createBaranErrorSchema<TRequestSchema extends z.AnyZodObject>(
	requestSchema: TRequestSchema
) {
	return z.object({
		type: z.string(),
		title: z.string(),
		status: z.number(),
		detail: z.string(),
		errors: z.record(
			requestSchema.keyof() as unknown as z.ZodEnum<
				[Exclude<keyof z.infer<TRequestSchema>, number | symbol>]
			>,
			z.string().array()
		)
	});
}

export type BaranErrorSchema<TRequestSchema extends z.AnyZodObject> = ReturnType<
	typeof createBaranErrorSchema<TRequestSchema>
>;

export type BaranError<TRequestSchema extends z.AnyZodObject> = z.infer<
	BaranErrorSchema<TRequestSchema>
>;
