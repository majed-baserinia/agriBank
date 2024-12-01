import { program, Option, Command } from "commander";
import { z } from "zod";
import { generate } from "./generate";

export const customOperationCommands = ["tag", "last-segment", "method"] as const;
export const customOperationFormatters = ["camelcase", "snakecase", "pascalcase"] as const;

export const optionsSchema = z.object({
	url: z.string(),
	out: z.string(),
	axiosVersion: z.string(),
	/**
	 * if api ends points start with `removeEndpointPrefix` it will replace the path with an empty string
	 * @example
	 * /api/something/something-else -> /something/something-else
	 */
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
	skipSpecValidations: z.boolean({ coerce: true }).optional(),
	customizeOperationId: z
		.string()
		.optional()
		.refine(
			(v) =>
				v === undefined ||
				v.split("_").every((cmd) => {
					const sp = cmd.split(":");
					if (!customOperationCommands.some((cmd) => cmd == sp[0])) {
						return false;
					}
					if (sp[1] && !customOperationFormatters.some((cmd) => cmd == sp[1])) {
						return false;
					}

					return true;
				}),
			{
				message: `invalid format, correct format is any combinations of commands=${customOperationCommands} joined with '_' and formatters=${JSON.stringify(customOperationFormatters)} appended with ':'`
			}
		)
		.transform((v) => {
			type Commands = (typeof customOperationCommands)[number];
			type Formatters = (typeof customOperationFormatters)[number];

			return v?.split("_").map((v) => v.split(":")) as (
				| [`${Commands}`, `${Formatters}`]
				| [`${Commands}`]
			)[];
		}),
	overwriteExistingOperationIds: z.boolean({ coerce: true }).optional()
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
				"--skip-spec-validations <boolean>",
				"see https://openapi-generator.tech/docs/configuration/ and search for skip-validate-spec"
			)
		)
		.addOption(
			new Option(
				"--customize-operation-id <boolean>",
				`modify operationId of spec, with any combinations of ${JSON.stringify(customOperationFormatters)}. For POST /api/Account/inquiry-account-balance/{account} we can do m_ls_m:camelcase which will generate postInquiryAccountBalancePost. Current available formatters are ${JSON.stringify(customOperationFormatters)}.
				note that, methods with existing operationIds are ignored, if you want to modify them use it in combination with '--overwrite-existing-operation-ids'
				`
			)
		)
		.addOption(
			new Option(
				"--overwrite-existing-operation-ids",
				"if needed, used in combination with '--customize-operation-id'."
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
