import { program, Option, Command } from "commander";
import { z } from "zod";
import { generate } from "./generate";

export const optionsSchema = z.object({
	url: z.string(),
	out: z.string(),
	axiosVersion: z.string()
});

export function setupCommand() {
	const command = new Command("generate-clients");
	program.addCommand(command);

	command.addOption(
		new Option("--url <url>", "openapi json spec address")
			.env("OPENAPI_URL")
			.makeOptionMandatory(true)
	);
	command.addOption(new Option("--axios-version <string>", "axios version").default("1.7.0"));
	command.addOption(
		new Option("--out <string>", "output directory").default("src/generated-clients")
	);
	command.addHelpText(
		"afterAll",
		"\n* in order to ignore generating some apis or models, consider using the `.openapi-generator-ignore` file"
	);

	command.action((options) => {
		call(optionsSchema.parse(options));
	});

	return command;
}

export function call(obj: object) {
	generate(optionsSchema.parse(obj));
}
