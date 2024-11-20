import { execSync } from "child_process";
import * as fs from "fs";
import path from "path";

export type Config = {
	repoUrl: string;
	branch: string;
	/**
	 * will be removed after cloning is done
	 */
	tempDir: string;
	outDir: string;
	/**
	 * the path that will be cloned
	 */
	sparsePath: string;
};

export function sparsCheckout({ repoUrl, sparsePath, tempDir, outDir, branch }: Config) {
	try {
		console.log(`cloning only '${sparsePath}' from ${repoUrl}...`);

		// step 1: Initialize a bare repo
		execSync(`git init ${tempDir}`, { stdio: "inherit" });

		// step 2: Set sparse-checkout
		execSync(`git -C ${tempDir} config core.sparseCheckout true`, { stdio: "inherit" });

		// step 3: Define the sparse path
		fs.writeFileSync(path.join(tempDir, ".git/info/sparse-checkout"), `${sparsePath}\n`);

		// step 4: Add the remote and fetch only the required path
		execSync(`git -C ${tempDir} remote add origin ${repoUrl}`, { stdio: "inherit" });
		execSync(`git -C ${tempDir} pull origin ${branch} --depth=1`, { stdio: "inherit" });

		// step 5: Copy the sparse folder to the target directory
		const sourceDir = path.join(tempDir, sparsePath);
		const copyRecursiveSync = (src: string, dest: string) => {
			const entries = fs.readdirSync(src, { withFileTypes: true });

			for (const entry of entries) {
				const srcPath = path.join(src, entry.name);
				const destPath = path.join(dest, entry.name);

				if (entry.isDirectory()) {
					fs.mkdirSync(destPath, { recursive: true });
					copyRecursiveSync(srcPath, destPath);
				} else {
					fs.copyFileSync(srcPath, destPath);
				}
			}
		};

		if (!fs.existsSync(outDir)) {
			fs.mkdirSync(outDir, { recursive: true });
		}

		copyRecursiveSync(sourceDir, outDir);

		console.log(`templates copied to ${outDir}`);
	} catch (e) {
		throw e;
	} finally {
		// step 6: Clean up temporary directory
		fs.rmSync(tempDir, { recursive: true, force: true });
		console.log("temporary files cleaned up.");
	}
}
