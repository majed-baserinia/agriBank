import { mkdir, rm, rmdir, writeFile } from "fs/promises";
import { join } from "path";

type Config = {
	url: string;
	/**
	 * if api ends points start with `removeEndpointPrefix` it will replace the path with an empty string
	 * @example
	 * with removeEndpointPrefix = /api
	 * /api/something/something-else -> /something/something-else
	 */
	output: string;
	tempDir: string;
	removeEndpointPrefix?: string;
};

type Spec = { [key: string]: Spec };

function replacePrefixes(spec: Spec, prefixToReplace: string) {
	console.log("removing prefix from api endpoints", prefixToReplace);
	const paths = spec["paths"];
	Object.entries(paths).forEach(([key, value]) => {
		if (key.startsWith(prefixToReplace)) {
			delete paths[key];
			paths[key.replace(prefixToReplace, "")] = value;
		}
	});
	return spec;
}

/**
 * @param config
 * @returns path to the file created
 */
export async function writeOpenApiSpec(config: Config) {
	let path: string | undefined = undefined;
	try {
		const spec = (await (await fetch(config.url)).json()) as Spec;

		const modified = config.removeEndpointPrefix
			? replacePrefixes(spec, config.removeEndpointPrefix)
			: spec;

		await mkdir(config.tempDir, {
			recursive: true
		});

		const outFilePath = join(config.tempDir, config.output);

		console.log("writing openapi spec", outFilePath);

		await writeFile(outFilePath, JSON.stringify(modified), {
			encoding: "utf8"
		});

		path = outFilePath;

		console.log("successfully wrote openapi spec to", outFilePath);
	} finally {
		return {
			outputFilePath: path,
			[Symbol.asyncDispose]: async () => {
				await rm(config.tempDir, { recursive: true, force: true });
			}
		};
	}
}
