import type { CheckDefinition } from "../types.js";

export const pythonCheck: CheckDefinition = {
  name: "Python",
  async run(options) {
    const result = await options.exec("python3", ["--version"]);
    if (!result.ok) {
      return {
        name: "Python",
        status: "warning",
        message: "Python 3 was not found",
        details: [result.stderr || "Install Python 3"],
        suggestedFix: "Install Python 3"
      };
    }

    return {
      name: "Python",
      status: "pass",
      message: result.stdout.trim(),
      details: []
    };
  }
};
