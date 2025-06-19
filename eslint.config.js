// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    extends: [js.configs.recommended],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
]);
