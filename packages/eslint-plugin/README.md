# Linting rules

A set of linter rules that all htsc apps should apply.

# Example usage

your eslint.config.mjs

```ts
import htsceslint from "@htsc/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(...htsceslint.configs["flat/recommended"], {
	languageOptions: {
		parserOptions: {
			tsconfigRootDir: import.meta.dirname,
			project: "./tsconfig.eslint.json"
		}
	}
});
```
