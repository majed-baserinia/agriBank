import parser from "@typescript-eslint/parser";
// @ts-expect-error
import eslintPlugin from "eslint-plugin-eslint-plugin";
import nodePlugin from "eslint-plugin-n";
import tseslint from "typescript-eslint";

export default tseslint.config(
	nodePlugin.configs["flat/recommended-script"],
	eslintPlugin.configs["flat/recommended"],
	{
		languageOptions: {
			parser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
			}
		},
		rules: {
			"n/exports-style": ["error", "module.exports"]
		}
	}
);
