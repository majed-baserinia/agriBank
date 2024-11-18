import { Command, Option, program } from "commander";
import { z } from "zod";
import { generate } from "./generate";

export const optionsSchema = z.object({
	out: z.string()
});

export function setupCommand() {
	const command = new Command("create");
	program.addCommand(command);
	command.addOption(new Option("--out <string>", "output directory").default("./"));
	command.action((options) => {
		call(options);
	});
	return command;
}

export function call(options: object) {
	generate(optionsSchema.parse(options));
}
