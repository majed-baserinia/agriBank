import { program, Option } from "commander";
import { z } from "zod";

export const schema = z.object({
	url: z.string(),
	out: z.string(),
	axiosVersion: z.string()
});

program.addOption(
	new Option("--url <url>", "openapi json spec address")
		.env("OPENAPI_URL")
		.makeOptionMandatory(true)
);
program.addOption(new Option("--axios-version <string>", "axios version").default("1.7.0"));
program.addOption(
	new Option("--out <string>", "output directory").default("src/generated-clients")
);
program.addHelpText(
	"afterAll",
	"\n* in order to ignore generating some apis or models, consider using the `.openapi-generator-ignore` file"
);
