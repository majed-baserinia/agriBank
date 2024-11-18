import { spawn } from "child_process";
import type { optionsSchema } from "$/generate-clients/cli";
import type { z } from "zod";

export async function generateAxiosClients(config: z.infer<typeof optionsSchema>) {
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
				"--input-spec",
				config.url,
				"--additional-properties",
				`supportsES6=true,axiosVersion=${config.axiosVersion},useSingleRequestParameter=false,legacyDiscriminatorBehavior=false,useSingleRequestParameter=true,modelPackage=models,apiPackage=apis,withSeparateModelsAndApi=true`
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
				console.error("An error happened while generating axios clients");
				throw new Error("application with exit code: " + code);
			}
			resolve(undefined);
		});
	});
}
