// @ts-check

import htsceslint from "@htsc/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(...htsceslint.configs["flat/recommended"], {
	languageOptions: {
		parserOptions: {
			tsconfigRootDir: import.meta.url,
			project: "./tsconfig.eslint.json"
		}
	}
});
