import js from "@eslint/js";
import globals from "globals";
import imports from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
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
      "import": imports,
      "react": react,
      "react-refresh": reactRefresh,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
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
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true },
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
