// @ts-check
import { builtinModules } from "module";
import ts from "rollup-plugin-ts";
import node from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import { dependencies } from "./package.json";

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

const extensions = [".js", ".ts", ".mjs", ".tsx", ".json"];

/**
 * @return {import("rollup").RollupOptions}
 */
export default () => ({
  input: "./src/index.ts",
  external: builtinModules.concat(Object.keys(dependencies)),
  output: {
    file: "./lib/index.js",
    format: "cjs",
    banner: "/* eslint-disable */",
    sourcemap: true,
  },
  plugins: [
    ts({ transpileOnly: true }),
    node({ extensions }),
    cjs({ extensions }),
  ].filter(Boolean),
});
