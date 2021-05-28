const base = require("@foxone/dev/config/eslint.cjs");

module.exports = {
  ...base,
  ignorePatterns: [
    ".eslintrc.cjs",
    ".github/**",
    ".vscode/**",
    ".yarn/**",
    "**/build/*",
    "**/public/*",
    "**/coverage/*",
    "**/node_modules/*",
    "**/fennec-demo/*"
  ],
  parserOptions: {
    ...base.parserOptions,
    project: ["./tsconfig.json"]
  },
  rules: {
    ...base.rules,
    "@typescript-eslint/no-floating-promises": "off"
  }
};
