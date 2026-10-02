import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execa } from "execa";
import { dockerCheck } from "./checks/docker.js";
import { gitCheck } from "./checks/git.js";
import { nodeCheck } from "./checks/node.js";
import { portsCheck } from "./checks/ports.js";
import { pythonCheck } from "./checks/python.js";
import type { CheckDefinition, CheckOptions, CheckResult, CheckSummary, CommandResult } from "./types.js";

export const defaultChecks: CheckDefinition[] = [nodeCheck, gitCheck, pythonCheck, dockerCheck, portsCheck];
const storageDirectory = path.join(os.homedir(), ".devdoctor");
const historyFilePath = path.join(storageDirectory, "history.json");
const settingsFilePath = path.join(storageDirectory, "settings.json");

export async function executeCommand(command: string, args: string[] = []): Promise<CommandResult> {
  try {
    const { stdout, stderr, exitCode } = await execa(command, args, { reject: false });
    return {
      ok: exitCode === 0,
      stdout,
      stderr,
      exitCode: exitCode ?? null
    };
  } catch (error) {
    const commandError = error as { shortMessage?: string; stderr?: string; exitCode?: number };
    return {
      ok: false,
      stdout: "",
      stderr: commandError.stderr ?? commandError.shortMessage ?? "Command failed",
      exitCode: commandError.exitCode ?? null
    };
  }
}

export function summarize(results: CheckResult[]): CheckSummary {
  return {
    passed: results.filter((result) => result.status === "pass").length,
    warnings: results.filter((result) => result.status === "warning").length,
    failed: results.filter((result) => result.status === "fail").length,
    total: results.length
  };
}

export async function runChecks(checks: CheckDefinition[], partialOptions: Partial<CheckOptions> = {}) {
  const options: CheckOptions = {
    exec: partialOptions.exec ?? executeCommand,
    minNodeMajor: partialOptions.minNodeMajor ?? 20,
    ports: partialOptions.ports ?? [3000]
  };

  const results: CheckResult[] = [];
  for (const check of checks) {
    results.push(await check.run(options));
  }

  const summary = summarize(results);
  await saveCheckRun(results, summary);

  return {
    results,
    summary
  };
}

export async function runAllChecks(partialOptions: Partial<CheckOptions> = {}) {
  return await runChecks(defaultChecks, partialOptions);
}

async function saveCheckRun(results: CheckResult[], summary: CheckSummary) {
  try {
    await mkdir(storageDirectory, { recursive: true });
    await ensureSettingsFile();

    const existing = await readHistory();
    existing.push({
      timestamp: new Date().toISOString(),
      results,
      summary
    });

    await writeFile(historyFilePath, JSON.stringify(existing, null, 2), "utf8");
  } catch {}
}

async function ensureSettingsFile() {
  try {
    await readFile(settingsFilePath, "utf8");
  } catch {
    await writeFile(
      settingsFilePath,
      JSON.stringify(
        {
          minNodeMajor: 20,
          ports: [3000]
        },
        null,
        2
      ),
      "utf8"
    );
  }
}

async function readHistory() {
  try {
    const data = await readFile(historyFilePath, "utf8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
