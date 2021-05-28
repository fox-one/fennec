const base = require("./webpack.base");

const entry = {
  background: "./src/background.ts",
  content: "./src/content.ts",
  extension: "./src/extension.ts",
  page: "./src/page.ts"
};

module.exports = {
  ...base,
  entry
};
