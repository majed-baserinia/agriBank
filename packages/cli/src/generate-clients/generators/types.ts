import type { optionsSchema } from "$/generate-clients/cli";
import type { z } from "zod";

export type ConfigWithModifiedSpec<
	T extends z.infer<typeof optionsSchema> = z.infer<typeof optionsSchema>
> = T & {
	modifiedSpecPath: string;
};
