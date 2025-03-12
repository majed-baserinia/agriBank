#!/usr/bin/env node

import { spawn } from "child_process";
import { Option, program } from "commander";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const args = z.object({
	port: z.string(),
	host: z
		.enum(["true", "false"])
		.transform((x) => x === "true")
		.pipe(z.boolean({ coerce: true }))
});

function addCommands() {
	program
		.addOption(
			new Option("--port <port>", "playground port").env("BARAN_PLAYGROUND_PORT").default("9000")
		)
		.addOption(
			new Option("--host <boolean>", "host playground on your local network")
				.env("BARAN_PLAYGROUND_HOST")
				.default("false")
		)
		.action((options) => {
			const parsed = args.parse(options);
			const outputDir = dirname(fileURLToPath(import.meta.url));

			const pnpmArguments = ["dlx", "vite", "preview", "--port", parsed.port, "--outDir", "."];

			if (parsed.host) {
				pnpmArguments.push("--host");
			}

			const vite = spawn("pnpm", pnpmArguments, {
				shell: true,
				cwd: outputDir
			});

			vite.stdout.on("data", (data) => {
				console.log(`baran-playground(message): ${data}`);
			});

			vite.on("error", (data) => {
				console.error(`baran-playground(error): ${data}`);
			});

			vite.on("close", (code) => {
				console.info(`baran-playground(close): process exited with code ${code}`);
			});
		});
}

addCommands();
program.parse();
