import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
// @ts-expect-error
import reactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error
import reactRefresh from "eslint-plugin-react-refresh";
import fs from "fs";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * @type {{name: string, version: string} & Record<string, any>}
 */
const pkg = JSON.parse(fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"));

const plugin = {
	meta: {
		name: pkg.name,
		version: pkg.version
	},
	configs: {
		"flat/recommended": tseslint.config(
			pluginJs.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			// @ts-expect-error
			pluginReact.configs.flat.recommended,
			// @ts-expect-error
			pluginReact.configs.flat["jsx-runtime"],
			eslintPluginPrettierRecommended,
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

			{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
			{
				languageOptions: {
					globals: globals.browser,
					parserOptions: {
						projectService: {
							allowDefaultProject: ["*.js", "*.mjs", ".*.mjs", "vite.config.ts"]
						},
						tsconfigRootDir: import.meta.dirname
					}
				}
			},
			{
				ignores: ["dist"]
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
					"prettier/prettier": "warn"
				}
			}
		)
	},
	rules: {},
	processor: {}
};

export default plugin;
