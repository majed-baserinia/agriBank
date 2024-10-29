import { mkdir, rm } from "fs/promises";
import { generateOpenApiToolsConfig } from "./generators/generate-openapitools-config.mjs";
import { generateZodSchemas } from "./generators/generate-zod-schemas.mjs";

/**
 * @param {import("zod").infer<typeof import("./main.mjs").schema>} config
 */
export async function generate(config) {
	console.log("Generating clients! @FoHoOV");

	await rm(config.out, {
		force: true,
		recursive: true
	});

	await mkdir(config.out, {
		recursive: true
	});

	await generateOpenApiToolsConfig(config);
	await generateZodSchemas(config);
}
