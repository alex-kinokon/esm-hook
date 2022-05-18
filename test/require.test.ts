import assert from "assert/strict";
import { describe, it } from "mocha";

describe("require", () => {
  it("should fail to require node-fetch", () => {
    assert.throws(
      () => require("node-fetch"),
      { code: "ERR_REQUIRE_ESM" },
      'require("node-fetch") should fail'
    );
  });

  it("should require node-fetch", () => {
    const unregister = require("..");
    assert.doesNotThrow(() => {
      const fetch = require("node-fetch");
      assert.equal(typeof fetch, "object");
      assert.equal(typeof fetch.default, "function");
    });
    unregister();
    delete require.cache[require.resolve("node-fetch")];
    assert.throws(
      () => require("node-fetch"),
      { code: "ERR_REQUIRE_ESM" },
      "unregister hook failed"
    );
  });
});
