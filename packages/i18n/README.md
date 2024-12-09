# I18n

agribank apps use `react-i18next` for i18, and this package includes the base language packs that other apps can use.

# Types

For a type-safe experience with `i18next` add this your d.ts file

```ts
import "@agribank/i18n/types";

import type YOUR_LANG_PACK from "./locals/[lang]/translation.json";

declare module "i18next" {
	interface AGRIBankTypeOptions {
		defaultNS: "translation"; // or whatever you like
		resources: {
			translation: typeof YOUR_LANG_PACK;
		};
	}
}
```

As you can see, instead of `CustomTypeOptions` you can use `AGRIBankTypeOptions` to add your types on top of this package.

- Read [the official i18next docs](https://www.i18next.com/overview/typescript#custom-type-options) for more info on `CustomTypeOptions`.
