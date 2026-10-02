import { describe, expect, it } from "vitest";
import { nodeCheck } from "../packages/checks/src/checks/node.js";

describe("nodeCheck", () => {
  it("fails when detected node major version is too old", async () => {
    const result = await nodeCheck.run({
      minNodeMajor: 20,
      ports: [3000],
      exec: async () => ({ ok: true, stdout: "v18.20.3", stderr: "", exitCode: 0 })
    });

    expect(result.status).toBe("fail");
    expect(result.suggestedFix).toContain("Upgrade Node.js");
  });

  it("passes for supported versions", async () => {
    const result = await nodeCheck.run({
      minNodeMajor: 20,
      ports: [3000],
      exec: async () => ({ ok: true, stdout: "v22.1.0", stderr: "", exitCode: 0 })
    });

    expect(result.status).toBe("pass");
  });
});
