import { mkdir, rm } from "fs/promises";
import { params } from "./args.mjs";
import { generateOpenApiToolsConfig } from "./generators/generate-openapitools-config.mjs";
import { generateZodSchemas } from "./generators/generate-zod-schemas.mjs";

export async function generate() {
	await rm(params.out, {
		force: true,
		recursive: true
	});

	await mkdir(params.out, {
		recursive: true
	});

	await generateOpenApiToolsConfig(params);
	await generateZodSchemas(params);
}
