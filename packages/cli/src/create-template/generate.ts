import type { optionsSchema } from "$/create-template/cli";
import { sparsCheckout } from "$/create-template/git";
import type { z } from "zod";

export function generate(options: z.infer<typeof optionsSchema>) {
	sparsCheckout({
		branch: "main",
		outDir: options.out,
		repoUrl: "https://github.com/FoHoOV/htsc.git",
		sparsePath: "templates/default",
		tempDir: "./htsc-tmp"
	});
}
