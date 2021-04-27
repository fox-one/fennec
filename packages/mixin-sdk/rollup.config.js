import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.ts",
  output: {
    dir: "build",
    format: "esm"
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      extensions: [".ts", ".js"]
    }),
    typescript(),
    commonjs({ extensions: [".js", ".ts"] }),
    babel({ babelHelpers: "bundled" }),
    json(),
    terser()
  ]
};
