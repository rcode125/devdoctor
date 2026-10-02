import type { CheckSummary as CheckSummaryType } from "../../../../../packages/checks/src/index.js";

type Props = {
  summary: CheckSummaryType;
};

export function CheckSummary({ summary }: Props) {
  return (
    <div className="check-summary">
      <strong>Summary:</strong>
      <p>{summary.passed} passed</p>
      <p>{summary.warnings} warnings</p>
      <p>{summary.failed} failed</p>
    </div>
  );
}
