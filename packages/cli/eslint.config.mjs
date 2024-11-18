import parser from "@typescript-eslint/parser";
import nodePlugin from "eslint-plugin-n";
import tseslint from "typescript-eslint";

export default tseslint.config(nodePlugin.configs["flat/recommended-script"], {
	languageOptions: {
		parser,
		parserOptions: {
			ecmaVersion: "latest",
			sourceType: "module"
		}
	}
});
