const base = require("./webpack.base");

const entry = {
  manifest: './manifest.json',
  extension: "./src/extension.ts",
  background: "./src/background.ts",
  content: "./src/content.ts",
  page: "./src/page.ts"
};

module.exports = {
  ...base,
  entry
};
