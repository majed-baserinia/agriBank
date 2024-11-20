import type { optionsSchema } from "$/create-template/cli";
import { sparsCheckout } from "$/create-template/git";
import type { z } from "zod";
import * as fs from "fs";
import { join } from "path";

function createEnvFile(options: z.infer<typeof optionsSchema>) {
	fs.writeFileSync(join(options.out, ".env"), `VITE_APP_NAME = ${options.appName}`);
}

function setApplicationName(options: z.infer<typeof optionsSchema>) {
	const replaceApplicationName = (fileName: string) => {
		const filePath = join(options.out, fileName);
		const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
		fs.writeFileSync(filePath, fileContent.replace("{{APP_NAME}}", options.appName));
	};
	replaceApplicationName("package.json");
}

export function generate(options: z.infer<typeof optionsSchema>) {
	sparsCheckout({
		branch: "main",
		outDir: options.out,
		repoUrl: "https://github.com/FoHoOV/htsc.git",
		sparsePath: "templates/default",
		tempDir: "./htsc-tmp"
	});
	createEnvFile(options);
	setApplicationName(options);
}
