import { spawn } from "child_process";
import type { ConfigWithModifiedSpec } from "$/generate-clients/generators/types";

export async function generateAxiosClients(config: ConfigWithModifiedSpec) {
	return new Promise((resolve) => {
		const cmd = spawn(
			"pnpm",
			[
				"exec",
				"openapi-generator-cli",
				"generate",
				"--output",
				config.out,
				"--generator-name",
				"typescript-axios",
				...[config.skipSpecValidations ? "--skip-validate-spec" : ""],
				"--input-spec",
				config.modifiedSpecPath,
				"--additional-properties",
				`supportsES6=true,axiosVersion=${config.axiosVersion},ensureUniqueParams=true,legacyDiscriminatorBehavior=false,modelPackage=models,apiPackage=apis,withSeparateModelsAndApi=true`
			],
			{
				shell: true
			}
		);

		cmd.stdout.on("data", (data) => {
			console.log(data.toString());
		});

		cmd.on("error", (error) => {
			console.error(error.message);
		});

		cmd.on("close", (code) => {
			if (code !== 0) {
				console.error("An error happened while using openapitools generator");
				throw new Error("application with exit code: " + code);
			}
			resolve(undefined);
		});
	});
}
