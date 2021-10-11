const base = require("@foxone/dev/config/eslint.cjs");

module.exports = {
  ...base,
  root: true,
  ignorePatterns: [
    ".eslintrc.cjs",
    ".github/**",
    ".vscode/**",
    ".yarn/**",
    "**/build/*",
    "**/public/*",
    "**/coverage/*",
    "**/node_modules/*"
  ],
  parserOptions: {
    ...base.parserOptions,
    project: ["./tsconfig.eslint.json"]
  },
  rules: {
    ...base.rules,
    "vue/valid-v-slot": "off",
    "vue/no-v-html": "off",
    "no-undef": "off",
    "sort-keys": "off",
    "@typescript-eslint/no-floating-promises": "off"
  }
};
