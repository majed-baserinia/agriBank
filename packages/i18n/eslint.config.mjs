import agribank from "@agribank/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(...agribank.configs["flat/recommended"], {
	languageOptions: {
		parserOptions: {
			tsconfigRootDir: import.meta.dirname,
			project: "./tsconfig.json"
		}
	}
});
