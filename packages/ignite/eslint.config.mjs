import agribankESlint from "@agribank/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(...agribankESlint.configs["flat/recommended"], {
	languageOptions: {
		parserOptions: {
			tsconfigRootDir: import.meta.dirname,
			project: "./tsconfig.eslint.json"
		}
	}
});
