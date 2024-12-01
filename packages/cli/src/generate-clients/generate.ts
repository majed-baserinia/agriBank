import { mkdir, rm } from "fs/promises";
import { generateAxiosClients } from "./generators/generate-openapitools-config.js";
import { generateZodSchemas } from "./generators/generate-zod-schemas.js";
import type { z } from "zod";
import type { optionsSchema } from "./cli.js";
import { writeOpenApiSpec } from "$/generate-clients/get-openapi-spec.js";
import { join } from "path";

export async function generate(config: z.infer<typeof optionsSchema>) {
	console.log("Generating clients! @FoHoOV");

	await rm(config.out, {
		force: true,
		recursive: true
	});

	await mkdir(config.out, {
		recursive: true
	});

	await using specPath = await writeOpenApiSpec({
		output: "spec.json",
		tempDir: join(config.out, ".tmp"),
		...config
	});

	if (!specPath.outputFilePath) {
		throw new Error("failed to write spec file (or transform it)");
	}

	await generateAxiosClients({ ...config, modifiedSpecPath: specPath.outputFilePath });
	await generateZodSchemas({ ...config, modifiedSpecPath: specPath.outputFilePath });
}
