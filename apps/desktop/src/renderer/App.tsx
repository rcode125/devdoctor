import { useEffect, useState } from "react";
import { collectSuggestedFixes } from "../../../../packages/checks/src/index.js";
import type { CheckResult, CheckSummary as CheckSummaryType } from "../../../../packages/checks/src/index.js";
import { CheckCard } from "./components/CheckCard.js";
import { CheckSummary } from "./components/CheckSummary.js";
import { FixSuggestion } from "./components/FixSuggestion.js";

export function App() {
  const [results, setResults] = useState<CheckResult[]>([]);
  const [summary, setSummary] = useState<CheckSummaryType>({ passed: 0, warnings: 0, failed: 0, total: 0 });

  useEffect(() => {
    const run = async () => {
      const payload = await window.devdoctor.runChecks();
      setResults(payload.results);
      setSummary(payload.summary);
    };

    void run();
  }, []);

  return (
    <main className="app">
      <h1>DevDoctor</h1>
      {results.map((result) => (
        <CheckCard key={result.name} result={result} />
      ))}
      <CheckSummary summary={summary} />
      <FixSuggestion fixes={collectSuggestedFixes(results)} />
    </main>
  );
}
