# Prettier

Our shared prettier config that each app should apply. Not using this config might result in CI/CD errors.

# Example

prettier.config.mjs

```js
import { htscPrettierConfig } from "@htsc/prettier-config";

/**
 * @type {import("prettier").Config}
 */
const config = {
	...htscPrettierConfig
};

export default config;
```
