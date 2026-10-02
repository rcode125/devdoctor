import { parseVersion } from "../version.js";
import type { CheckDefinition } from "../types.js";

export const nodeCheck: CheckDefinition = {
  name: "Node.js",
  async run(options) {
    const result = await options.exec("node", ["--version"]);

    if (!result.ok) {
      return {
        name: "Node.js",
        status: "fail",
        message: "Node.js was not found",
        details: [result.stderr || "Install Node.js 20 or newer"],
        suggestedFix: "Install Node.js 20+",
        metadata: { minRequiredMajor: options.minNodeMajor } as Record<string, string | number | boolean>
      };
    }

    const parsedVersion = parseVersion(result.stdout);
    if (!parsedVersion) {
      return {
        name: "Node.js",
        status: "warning",
        message: `Detected Node.js output but failed to parse version: ${result.stdout.trim()}`,
        details: [],
        suggestedFix: "Reinstall Node.js"
      };
    }

    if (parsedVersion.major < options.minNodeMajor) {
      return {
        name: "Node.js",
        status: "fail",
        message: `Node.js ${parsedVersion.raw} detected but ${options.minNodeMajor}+ is required`,
        details: [],
        suggestedFix: `Upgrade Node.js to ${options.minNodeMajor}+`,
        metadata: {
          detectedMajor: parsedVersion.major,
          minRequiredMajor: options.minNodeMajor
        } as Record<string, string | number | boolean>
      };
    }

    return {
      name: "Node.js",
      status: "pass",
      message: `Node.js ${parsedVersion.raw} detected`,
      details: []
    };
  }
};
