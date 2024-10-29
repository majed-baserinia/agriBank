import { program, Option } from "commander";
import { z } from "zod";

program.addOption(new Option("--url <url>", "openapi json spec address").env("OPENAPI_URL").makeOptionMandatory(true));
program.addOption(new Option("--tags <tags...>", "set of tags to include"));
program.addOption(new Option("--out <string>", "output directory").default("src/generated-clients"));

export const schema = z.object({
	url: z.string(),
	out: z.string(),
	tags: z.array(z.string()).optional()
});

export const params = schema.parse(program.parse().opts());
