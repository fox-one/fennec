const config = require("@foxone/dev/config/jest.cjs");

module.exports = Object.assign({}, config, {
  modulePathIgnorePatterns: ["<rootDir>/packages/dev/build"],
  resolver: "@foxone/dev/config/jest-resolver.cjs"
});
