const { defaults } = require("jest-config");

module.exports = {
  browser: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": require.resolve("babel-jest")
  },
  verbose: true,
  moduleNameMapper: {
    "@foxone/mixin-extension-(base|ui)(.*)$": "<rootDir>/packages/mixin-extension-$1/src/$2",
    "@foxone/mixin-sdk(.*)$": "<rootDir>/packages/mixin-sdk/src/$1",
    "\\.(css|less)$": "empty/object",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js"
  },
  modulePathIgnorePatterns: [
    "<rootDir>/packages/mixin-extension/build",
    "<rootDir>/packages/mixin-extension-base/build",
    "<rootDir>/packages/mixin-extension-ui/build",
    "<rootDir>/packages/mixin-extension-demo/build",
    "<rootDir>/packages/mixin-sdk/build"
  ]
};
