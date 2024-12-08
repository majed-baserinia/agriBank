/**
 * @type {import("prettier").Config}
 */
export const agribankPrettierConfig = {
	plugins: [
		"prettier-plugin-organize-attributes",
		"prettier-plugin-organize-imports",
		"prettier-plugin-tailwindcss"
	],
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
