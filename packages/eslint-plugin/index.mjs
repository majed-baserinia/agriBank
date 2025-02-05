import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
// @ts-expect-error
import reactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error
import reactRefresh from "eslint-plugin-react-refresh";
import pluginRouter from "@tanstack/eslint-plugin-router";
import pluginQuery from "@tanstack/eslint-plugin-query";
import fs from "fs";
import globals from "globals";
import tseslint from "typescript-eslint";
import packageJson from "eslint-plugin-package-json/configs/recommended";
import * as regexp from "eslint-plugin-regexp";
import path from "path";
/**
 * @type {Record<string, any>}
 */
const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf8"));
const recommendedBase = tseslint.config(
	pluginJs.configs.recommended,
	eslintPluginPrettierRecommended,
	packageJson,
	...tseslint.configs.recommended,
	regexp.configs["flat/recommended"],
	{
		// TODO: enable json linting which includes package.json
		ignores: [
			"dist/",
			"node_modules/",
			"pnpm-lock.yaml",
			"**/*/.generated/",
			"**/*.json",
			"playwright-report"
		]
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]
	},
	{
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				tsconfigRootDir: process.cwd(),
				projectService: true
			}
		}
	},
	{
		rules: {
			"no-unused-expressions": "off",
			"@typescript-eslint/no-unused-expressions": [
				"error",
				{
					allowShortCircuit: true,
					allowTernary: true,
					enforceForJSX: true
				}
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true
				}
			],
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: {
						attributes: false
					}
				}
			],
			"@typescript-eslint/only-throw-error": "warn",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/prefer-promise-reject-errors": "warn",
			"prettier/prettier": "warn",
			"perfectionist/sort-objects": "off",
			"no-restricted-imports": [
				"error",
				{
					patterns: [
						{
							group: ["$/features/*/*"],
							message: "only import from index file of features are allowed"
						}
					]
				}
			]
		}
	}
);
const reactConfig = tseslint.config(
	{
		// in main config for TSX/JSX source files
		plugins: {
			"react-refresh": reactRefresh
		},
		rules: {
			"react-refresh/only-export-components": "warn"
		}
	},
	// @ts-expect-error
	pluginReact.configs.flat.recommended,
	// @ts-expect-error
	pluginReact.configs.flat["jsx-runtime"],
	{
		settings: {
			react: {
				version: "detect",
				defaultVersion: "18"
			}
		}
	},
	{
		plugins: {
			"react-hooks": reactHooks
		},
		rules: {
			...reactHooks.configs.recommended.rules
		}
	},
	{
		rules: {
			"react/prop-types": [
				"error",
				{
					ignore: ["children", "className", "theme", "variant"],
					skipUndeclared: true
				}
			],
			"react/self-closing-comp": [
				"error",
				{
					component: true,
					html: true
				}
			]
		}
	}
);
const plugin = {
	meta: {
		name: pkg.name,
		version: pkg.version
	},
	/**
	 * @type {Record<"flat/recommended" | "flat/recommended-type-checked" | "flat/tanstack", import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray>}
	 */
	configs: {
		"flat/recommended": tseslint.config(...recommendedBase, ...reactConfig),
		"flat/recommended-type-checked": tseslint.config(
			...recommendedBase,
			...tseslint.configs.recommendedTypeCheckedOnly,
			...reactConfig
		),
		"flat/tanstack": tseslint.config(
			...reactConfig,
			...pluginRouter.configs["flat/recommended"],
			...pluginQuery.configs["flat/recommended"]
		)
	},
	rules: {},
	processor: {}
};
export default plugin;
