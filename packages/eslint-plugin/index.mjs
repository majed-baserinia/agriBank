import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
// @ts-expect-error
import reactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error
import reactRefresh from "eslint-plugin-react-refresh";
import pluginRouter from "@tanstack/eslint-plugin-router";
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

const plugin = {
	meta: {
		name: pkg.name,
		version: pkg.version
	},
	configs: {
		/**
		 * @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray}
		 */
		"flat/recommended": tseslint.config(
			pluginJs.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			// @ts-expect-error
			pluginReact.configs.flat.recommended,
			// @ts-expect-error
			pluginReact.configs.flat["jsx-runtime"],
			...pluginRouter.configs["flat/recommended"],
			eslintPluginPrettierRecommended,
			packageJson,
			regexp.configs["flat/recommended"],
			{
				plugins: {
					"react-hooks": reactHooks
				},
				rules: {
					...reactHooks.configs.recommended.rules
				}
			},
			{
				// in main config for TSX/JSX source files
				plugins: {
					"react-refresh": reactRefresh
				},
				rules: {
					"react-refresh/only-export-components": "warn"
				}
			},
			{
				// TODO: enable json linting which includes package.json
				ignores: ["dist/", "node_modules/", "pnpm-lock.yaml", "**/*/.generated/", "**/*.json"]
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
					"react-refresh/only-export-components": "warn",
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
					],
					"prettier/prettier": "warn",
					"perfectionist/sort-objects": "off"
				}
			}
		)
	},
	rules: {},
	processor: {}
};

export default plugin;
