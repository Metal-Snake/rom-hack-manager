import js from "@eslint/js";
import globals from "globals";
import imports from "eslint-plugin-import";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: react,
      import: imports,
    },
    rules: {
      "import/order": [
        "error",
        {
          "pathGroups": [{ pattern: "@/**", group: "external" }],
          "pathGroupsExcludedImportTypes": ["builtin"],
          "alphabetize": { order: "asc", caseInsensitive: false },
          "newlines-between": "never",
          "named": true,
        },
      ],
      "quote-props": ["error", "consistent"],
      "react/jsx-sort-props": ["error"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "sort-keys": [
        "error",
        "asc",
        { allowLineSeparatedGroups: true, caseSensitive: true, natural: true },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
);
