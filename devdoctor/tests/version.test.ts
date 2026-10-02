import { describe, expect, it } from "vitest";
import { parseVersion } from "../packages/checks/src/version.js";

describe("parseVersion", () => {
  it("parses semantic version from command output", () => {
    expect(parseVersion("v22.1.0")).toEqual({
      major: 22,
      minor: 1,
      patch: 0,
      raw: "22.1.0"
    });
  });

  it("returns null for invalid input", () => {
    expect(parseVersion("not-a-version")).toBeNull();
  });
});
