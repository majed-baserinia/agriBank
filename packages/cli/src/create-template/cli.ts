import { Command, Option, program } from "commander";
import { z } from "zod";
import { generate } from "./generate";

export const optionsSchema = z.object({
	out: z.string(),
	template: z.literal("tanstack-router").default("tanstack-router"),
	appName: z.string()
});

/**
 * @returns the created command
 */
export function setupCommand() {
	const command = new Command("create")
		.addOption(
			new Option(
				"--app-name <string>",
				"you application name which will also be used in the url"
			).makeOptionMandatory()
		)
		.addOption(new Option("--out <string>", "output directory").default("./"))
		.action((options) => {
			call(options);
		});
	program.addCommand(command);
	return command;
}

export function call(options: object) {
	generate(optionsSchema.parse(options));
}
