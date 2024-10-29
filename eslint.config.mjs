import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
	pluginJs.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			parserOptions: {
				sourceType: "module"
			}
		}
	},
	{
		rules: {
			"prettier/prettier": "warn"
		}
	}
);
