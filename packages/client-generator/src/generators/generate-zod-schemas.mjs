import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { mapOpenApiEndpoints, generateFile } from "typed-openapi";
import SwaggerParser from "@apidevtools/swagger-parser";

/**
 * @param {import("zod").infer<typeof import("../cli.mjs").schema>} config
 */
async function runTypedOpenApi(config) {
	const now = new Date();

	const openApiDoc = /**@type {import("openapi3-ts/oas31").OpenAPIObject} */ (
		await SwaggerParser.bundle(config.url)
	);

	const ctx = mapOpenApiEndpoints(openApiDoc);
	console.log(`Found ${ctx.endpointList.length} endpoints`);

	const content = generateFile({ ...ctx, runtime: "zod" });

	console.log(`Done in ${new Date().getTime() - now.getTime()}ms !`);
	return content;
}

/**
 * @param {import("zod").infer<typeof import("../cli.mjs").schema>} config
 */
export async function generateZodSchemas(config) {
	const contents = await runTypedOpenApi(config);

	const groups = Array.from(
		contents.matchAll(
			/^([\s\S]*)\/\/ <\/ApiClientTypes>\n\n\/\/ <ApiClient>\nexport class ApiClient \{[\s\S]*\/\/ <\/ApiClient/g
		)
	);

	if (groups.length > 1) {
		throw new Error("couldn't extract zod schemas: matched more than one schemas regex");
	}

	const output = groups[0][1];

	const OUTPUT_SCHEMA_FILE_NAME = "schemas.ts";
	const SCHEMA_FOLDER_PATH = `${config.out}/zod`;
	const SCHEMA_FILE_PATH = join(SCHEMA_FOLDER_PATH, OUTPUT_SCHEMA_FILE_NAME);

	await mkdir(SCHEMA_FOLDER_PATH, {
		recursive: true
	});

	console.log("writing zod schemas...", OUTPUT_SCHEMA_FILE_NAME);

	const header = `// @ts-nocheck`;
	await writeFile(SCHEMA_FILE_PATH, `${header}\n${output}`, {
		encoding: "utf-8"
	});
}
