import { fileURLToPath } from "url";

/**
 * Resolve a module path relative to this file's location.
 * @param moduleName {string}
 */
async function resolveModule(moduleName) {
	const modulePath = await import.meta.resolve(moduleName);
	return fileURLToPath(modulePath);
}

/**
 * @type {import("prettier").Config}
 */
export const agribankPrettierConfig = {
	plugins: await Promise.all([
		resolveModule("prettier-plugin-organize-attributes"),
		resolveModule("prettier-plugin-organize-imports"),
		resolveModule("prettier-plugin-tailwindcss")
	]),
	htmlWhitespaceSensitivity: "strict",
	tailwindFunctions: ["tw"],
	endOfLine: "auto",
	arrowParens: "always",
	bracketSpacing: true,
	bracketSameLine: false,
	printWidth: 100,
	proseWrap: "preserve",
	requirePragma: false,
	semi: true,
	tabWidth: 2,
	trailingComma: "none",
	useTabs: true,
	singleAttributePerLine: true
};

export default agribankPrettierConfig;
