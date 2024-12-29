import type { Request } from "$/types";
import { isAxiosError } from "axios";
import type { z } from "zod";

export async function handledRequest<
	TRequestSchema extends z.AnyZodObject,
	TResponseSchema extends z.ZodTypeAny
>(request: Request<TRequestSchema, TResponseSchema>, data: z.infer<TRequestSchema>) {
	try {
		return await request(data);
	} catch (e) {
		if (!isAxiosError(e)) {
			throw e;
		}
		if (!e.response) {
			throw e;
		}
		return e.response;
	}
}
