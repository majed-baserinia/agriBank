# Linting rules

A set of linter rules that all agribank apps should apply.

# Example usage

your eslint.config.mjs

```ts
import agribankESlint from "@agribank/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
	...agribankESlint.configs["flat/recommended-type-checked"],
	...agribankESlint.configs["flat/tanstack"],
	{
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				project: "./tsconfig.json"
			}
		}
	}
);
```
