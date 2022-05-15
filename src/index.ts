import fs from "fs";
import Module from "module";
import type { TransformOptions } from "esbuild";
import { transformSync } from "esbuild";

interface _Module extends Module {
  _compile(compiled: string, filename: string): any;
}

/**
 * Register a `require` hook that transforms ESM files.
 * @param options Optional additional `esbuild` transform options.
 * @returns An unregister function that restores the state before registering.
 */
export function register(options?: TransformOptions) {
  const transformOptions: TransformOptions = {
    target: `node${process.versions.node.split(".")[0]}`,
    format: "cjs",
    loader: "js",
    ...options,
  };

  function esbuild(module: any, filename: string) {
    const source = fs.readFileSync(filename, "utf-8");
    const result = transformSync(source, transformOptions).code;
    return module._compile(result, filename);
  }

  const extensions: {
    [extension: `.${string}`]: (module: _Module, filename: string) => void;
  } = (Module as any)._extensions;

  const js = extensions[".js"];
  const mjs = extensions[".mjs"];

  extensions[".js"] = function (module, filename) {
    try {
      return js(module, filename);
    } catch (e) {
      if (e?.code === "ERR_REQUIRE_ESM") {
        return esbuild(module, filename);
      }
      throw e;
    }
  };

  extensions[".mjs"] ??= function (module, filename) {
    return esbuild(module, filename);
  };

  return () => {
    extensions[".js"] = js;
    extensions[".mjs"] = mjs;
  };
}
