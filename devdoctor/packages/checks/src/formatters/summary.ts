import type { CheckResult, CheckSummary } from "../types.js";

export function buildSummary(results: CheckResult[]): CheckSummary {
  return {
    passed: results.filter((result) => result.status === "pass").length,
    warnings: results.filter((result) => result.status === "warning").length,
    failed: results.filter((result) => result.status === "fail").length,
    total: results.length
  };
}

export function collectSuggestedFixes(results: CheckResult[]): string[] {
  return results
    .map((result) => result.suggestedFix)
    .filter((value): value is string => Boolean(value));
}

export function formatSummary(summary: CheckSummary): string {
  return [
    "Summary:",
    `${summary.passed} passed`,
    `${summary.warnings} warnings`,
    `${summary.failed} failed`
  ].join("\n");
}
