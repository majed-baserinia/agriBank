import htsceslint from "@htsc/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(...htsceslint.configs["flat/recommended"], {
	languageOptions: {
		parserOptions: {
			project: "./tsconfig.lint.json"
		}
	}
});
