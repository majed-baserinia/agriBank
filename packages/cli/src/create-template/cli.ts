import { Command, program } from "commander";
import { z } from "zod";
import { generate } from "./generate";

export const optionsSchema = z.object({});

export function setupCommand() {
	const command = new Command("create");
	program.addCommand(command);
	command.action((options) => {
		call(options);
	});
	return command;
}

export function call(options: object) {
	generate(optionsSchema.parse(options));
}
