import { writeFile } from "fs/promises";
import { spawn } from "child_process";
import { join } from "path";

export async function runOpenApiGenerator() {
	return new Promise((resolve) => {
		const cmd = spawn("openapi-generator-cli", ["generate", "--generator-key", "typescript-axios"]);
		cmd.on("close", (code) => {
			if (code !== 0) {
				process.exit(code);
			}
			resolve(undefined);
		});
	});
}

/**
 * @param {import("zod").infer<typeof import("../main.mjs").schema>} config
 */
export async function generateOpenApiToolsConfig(config) {
	const SCHEMA_FILE_PATH = join(import.meta.dirname, "openapitools.json");

	const template = {
		$schema: "./node_modules/@openapitools/openapi-generator-cli/config.schema.json",
		spaces: 2,
		"generator-cli": {
			version: "7.9.0",
			generators: {
				"typescript-axios": {
					generatorName: "typescript-axios",
					inputSpec: config.url,
					output: "./src/lib/generated-client",
					additionalProperties: {
						supportsES6: true,
						useSingleRequestParameter: false
					}
				}
			}
		}
	};

	await writeFile(SCHEMA_FILE_PATH, JSON.stringify(template, null, 2));
	await runOpenApiGenerator();
}
