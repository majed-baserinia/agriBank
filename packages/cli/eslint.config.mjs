import nodePlugin from "eslint-plugin-n";
import tseslint from "typescript-eslint";

export default tseslint.config(
	...tseslint.configs.recommended,
	nodePlugin.configs["flat/recommended"],
	nodePlugin.configs["flat/recommended-module"],
	{
		rules: {
			"n/no-missing-import": [
				"warn",
				{
					ignoreTypeImport: true,
					tsconfigPath: "./tsconfig.json"
				}
			]
		}
	},
	{ ignores: [".generated/", "dist/"] }
);
