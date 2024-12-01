import { program, Option, Command } from "commander";
import { z } from "zod";
import { generate } from "./generate";

export const optionsSchema = z.object({
	url: z.string(),
	out: z.string(),
	axiosVersion: z.string(),
	removeEndpointPrefix: z.string().optional(),
	replaceEndpointRegex: z
		.string()
		.optional()
		.refine((v) => v === undefined || v.split(",").length == 2, {
			message: "this prop should have two values separated by comma"
		})
		.transform((v) => {
			return v?.split(",").map((v, i) => {
				if (i == 0) {
					return RegExp(v.trim(), "g");
				}
				return v.trim();
			}) as [RegExp, string];
		}),
	skipSpecValidations: z.boolean({ coerce: true }).optional()
});

/**
 * @returns the created command
 */
export function setupCommand() {
	const command = new Command("generate-clients");
	command
		.addOption(
			new Option("--url <url>", "openapi json spec address")
				.env("OPENAPI_URL")
				.makeOptionMandatory(true)
		)
		.addOption(new Option("--axios-version <string>", "axios version").default("1.7.0"))
		.addOption(new Option("--out <string>", "output directory").default("src/generated-clients"))
		.addOption(
			new Option(
				"--remove-endpoint-prefix <string>",
				"removes a prefix from endpoints, ie turns /x/path to /path"
			)
		)
		.addOption(
			new Option(
				"--replace-endpoint-regex <regex>, <string>",
				"replaces regex <regex> with replace value <string>, runs before remove-endpoint-prefix command, ie --replace-endpoint-regex /api/,/account-report-service/"
			)
		)
		.addOption(
			new Option(
				"--skip-spec-validations <string>",
				"see https://openapi-generator.tech/docs/configuration/ and search for skip-validate-spec"
			)
		)
		.addHelpText(
			"afterAll",
			"\n* in order to ignore generating some apis or models, consider using the `.openapi-generator-ignore` file"
		)
		.action((options) => {
			call(options);
		});
	program.addCommand(command);
	return command;
}

export function call(obj: object) {
	generate(optionsSchema.parse(obj));
}
