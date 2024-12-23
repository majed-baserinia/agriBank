import type { optionsSchema } from "$/create-template/cli";
import { sparsCheckout } from "$/create-template/git";
import type { z } from "zod";
import * as fs from "fs";
import { join } from "path";

// function createEnvFile(options: z.infer<typeof optionsSchema>) {
// 	fs.writeFileSync(join(options.out, ".env"), `BASE_URL = ${options.appName}`);
// }

function setApplicationName(options: z.infer<typeof optionsSchema>) {
	const replaceApplicationName = (fileName: string, formatter?: (v: string) => string) => {
		const filePath = join(options.out, fileName);
		const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
		fs.writeFileSync(
			filePath,
			fileContent.replace("__APP_NAME__", formatter ? formatter(options.appName) : options.appName)
		);
	};
	replaceApplicationName("package.json");
	replaceApplicationName("vite.config.ts", (v) => `/${v}`);
	replaceApplicationName("tests/example.spec.ts");
}

export function generate(options: z.infer<typeof optionsSchema>) {
	sparsCheckout({
		branch: "main",
		outDir: options.out,
		repoUrl: "https://github.com/FoHoOV/agribank.git",
		sparsePath: `templates/${options.template}`,
		tempDir: "./agribank-tmp"
	});
	// createEnvFile(options);
	setApplicationName(options);
}
