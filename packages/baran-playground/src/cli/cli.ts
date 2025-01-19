#!/usr/bin/env node

import { spawn } from "child_process";
import { Option, program } from "commander";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const args = z.object({
	port: z.string()
});

function addCommands() {
	program
		.addOption(
			new Option("--port <port>", "playground port").env("BARAN_PLAYGROUND_PORT").default("9000")
		)
		.action((options) => {
			const parsed = args.parse(options);
			const outputDir = dirname(fileURLToPath(import.meta.url));
			const vite = spawn(
				"pnpm",
				["dlx", "vite", "preview", "--port", parsed.port, "--outDir", outputDir],
				{
					cwd: outputDir
				}
			);

			vite.stdout.on("data", (data) => {
				console.log(`agribank-playground(message): ${data}`);
			});

			vite.on("error", (data) => {
				console.error(`agribank-playground(error): ${data}`);
			});

			vite.on("close", (code) => {
				console.info(`agribank-playground(close): process exited with code ${code}`);
			});
		});
}

addCommands();
program.parse();
