import { describe, expect, it } from "vitest";
import { buildSummary, formatSummary } from "../packages/checks/src/formatters/summary.js";

describe("summary formatter", () => {
  it("builds and formats summary output", () => {
    const summary = buildSummary([
      { name: "Node.js", status: "pass", message: "ok", details: [] },
      { name: "Python", status: "warning", message: "missing", details: [], suggestedFix: "Install Python 3" },
      { name: "Docker", status: "fail", message: "daemon", details: [], suggestedFix: "Start Docker Desktop" }
    ]);

    expect(summary).toEqual({ passed: 1, warnings: 1, failed: 1, total: 3 });
    expect(formatSummary(summary)).toContain("1 passed");
    expect(formatSummary(summary)).toContain("1 warnings");
    expect(formatSummary(summary)).toContain("1 failed");
  });
});
