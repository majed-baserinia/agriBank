# Prettier

agribank shared prettier config that each app should apply. Not using this config might result in CI/CD errors.

# Example

prettier.config.mjs

```js
import agribankPrettierConfig from "@agribank/prettier-config";

/**
 * @type {import("prettier").Config}
 */
const config = {
	...agribankPrettierConfig
};

export default config;
```
