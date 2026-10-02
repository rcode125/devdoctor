export type CheckStatus = "pass" | "warning" | "fail";

export type CheckResult = {
  name: string;
  status: CheckStatus;
  message: string;
  details: string[];
  suggestedFix?: string;
  metadata?: Record<string, string | number | boolean>;
};

export type CommandResult = {
  ok: boolean;
  stdout: string;
  stderr: string;
  exitCode: number | null;
};

export type CheckOptions = {
  exec: (command: string, args?: string[]) => Promise<CommandResult>;
  minNodeMajor: number;
  ports: number[];
};

export type CheckDefinition = {
  name: string;
  run: (options: CheckOptions) => Promise<CheckResult>;
};

export type CheckSummary = {
  passed: number;
  warnings: number;
  failed: number;
  total: number;
};
