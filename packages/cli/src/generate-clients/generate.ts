import { mkdir, rm } from "fs/promises";
import { generateAxiosClients } from "./generators/generate-openapitools-config.js";
import { generateZodSchemas } from "./generators/generate-zod-schemas.js";
import type { z } from "zod";
import type { optionsSchema } from "./cli.js";

export async function generate(config: z.infer<typeof optionsSchema>) {
	console.log("Generating clients! @FoHoOV");

	await rm(config.out, {
		force: true,
		recursive: true
	});

	await mkdir(config.out, {
		recursive: true
	});

	await generateAxiosClients(config);
	await generateZodSchemas(config);
}
