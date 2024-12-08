import htsceslint from "@agribank/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(...htsceslint.configs["flat/recommended"], {
	languageOptions: {
		parserOptions: {
			tsconfigRootDir: import.meta.dirname,
			project: "./tsconfig.eslint.json"
		}
	}
});
