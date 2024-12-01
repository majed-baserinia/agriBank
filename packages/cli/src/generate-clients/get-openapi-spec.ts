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
	replaceEndpointRegex?: [RegExp, string];
};

type Spec = { [key: string]: Spec };

function loopOverPaths(
	spec: Spec,
	callback: (paths: Spec, kvp: { key: string; value: Spec }) => void
) {
	const paths = spec["paths"];
	Object.entries(paths).forEach(([key, value]) => {
		callback(paths, { key, value });
	});
}

function removePrefixes(spec: Spec, prefixToReplace: string) {
	console.log("removing prefix from api endpoints", prefixToReplace);
	loopOverPaths(spec, (paths, { key, value }) => {
		if (!key.startsWith(prefixToReplace)) {
			return;
		}
		delete paths[key];
		paths[key.replace(prefixToReplace, "")] = value;
	});
	return spec;
}

function replacePrefixes(spec: Spec, regex: RegExp, replacer: string) {
	console.log("replacing prefix from api endpoints", `from ${regex} to ${replacer}`);
	loopOverPaths(spec, (paths, { key, value }) => {
		if (!regex.test(key)) {
			return;
		}
		delete paths[key];
		paths[key.replace(regex, replacer)] = value;
	});
	return spec;
}

function modifySpec(spec: Spec, config: Config) {
	const replaced = config.replaceEndpointRegex
		? replacePrefixes(spec, config.replaceEndpointRegex[0], config.replaceEndpointRegex[1])
		: spec;

	return config.removeEndpointPrefix
		? removePrefixes(replaced, config.removeEndpointPrefix)
		: replaced;
}

/**
 * @param config
 * @returns path to the file created
 */
export async function writeOpenApiSpec(config: Config) {
	let path: string | undefined = undefined;
	try {
		const spec = (await (await fetch(config.url)).json()) as Spec;
		const modified = modifySpec(spec, config);

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
	} catch (e) {
		console.error(e);
		throw e;
	} finally {
		return {
			outputFilePath: path,
			[Symbol.asyncDispose]: async () => {
				await rm(config.tempDir, { recursive: true, force: true });
			}
		};
	}
}
