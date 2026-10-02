import chalk from "chalk";
import { Command } from "commander";
import { collectSuggestedFixes, formatSummary, runAllChecks } from "../../../../packages/checks/src/index.js";
import type { CheckResult } from "../../../../packages/checks/src/index.js";

function symbolFor(status: CheckResult["status"]): string {
  switch (status) {
    case "pass":
      return chalk.green("✓");
    case "warning":
      return chalk.yellow("⚠");
    default:
      return chalk.red("✗");
  }
}

export function checkCommand() {
  return new Command("check")
    .description("Run all environment checks")
    .action(async () => {
      console.log(chalk.bold("DevDoctor environment check\n"));

      const { results, summary } = await runAllChecks();

      for (const result of results) {
        console.log(`${symbolFor(result.status)} ${result.name.padEnd(11)} ${result.message}`);
      }

      console.log(`\n${formatSummary(summary)}`);

      const fixes = collectSuggestedFixes(results);
      if (fixes.length > 0) {
        console.log("\nSuggested fixes:");
        for (const fix of fixes) {
          console.log(`- ${fix}`);
        }
      }
    });
}
