module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  rules: {
    camelcase: "off",
    "space-before-function-paren": 0,
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/camelcase": ["off"],
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
  global: {
    browser: true
  }
};
