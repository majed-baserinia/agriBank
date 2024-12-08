# Linting rules

A set of linter rules that all agribank apps should apply.

# Example usage

your eslint.config.mjs

```ts
import agribank from "@agribank/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(...agribank.configs["flat/recommended"], {
	languageOptions: {
		parserOptions: {
			tsconfigRootDir: import.meta.dirname,
			project: "./tsconfig.eslint.json"
		}
	}
});
```
