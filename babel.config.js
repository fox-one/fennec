module.exports = {
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-transform-runtime"],
    "@babel/plugin-syntax-bigint",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-syntax-top-level-await"
  ],
  presets: ["@babel/preset-typescript", ["@babel/preset-env", { targets: { node: "current" } }]]
};
