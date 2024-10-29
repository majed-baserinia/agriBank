import { program, Option } from "commander";
import { z } from "zod";

export const schema = z.object({
	url: z.string(),
	out: z.string(),
	axiosVersion: z.string(),
	tags: z.array(z.string()).optional()
});

program.addOption(new Option("--url <url>", "openapi json spec address").env("OPENAPI_URL").makeOptionMandatory(true));
program.addOption(new Option("--axios-version", "axios version").default("1.7.0"));
program.addOption(new Option("--tags <tags...>", "set of tags to include").default(undefined));
program.addOption(new Option("--out <string>", "output directory").default("src/generated-clients"));
