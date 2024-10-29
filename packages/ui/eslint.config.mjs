import htsceslint from "@htsc/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(...htsceslint.configs["flat/recommended"]);
