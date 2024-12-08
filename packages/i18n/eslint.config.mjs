import htsceslint from "@agribank/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(...htsceslint.configs["flat/recommended"], {
	languageOptions: {
		parserOptions: {
			project: ["./tsconfig.eslint.json"],
			tsconfigRootDir: import.meta.dirname
		}
	}
});
