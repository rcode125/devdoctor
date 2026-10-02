import type { CheckDefinition } from "../types.js";

export const gitCheck: CheckDefinition = {
  name: "Git",
  async run(options) {
    const result = await options.exec("git", ["--version"]);
    if (!result.ok) {
      return {
        name: "Git",
        status: "fail",
        message: "Git was not found",
        details: [result.stderr || "Install Git"],
        suggestedFix: "Install Git"
      };
    }

    return {
      name: "Git",
      status: "pass",
      message: result.stdout.trim() || "Git detected",
      details: []
    };
  }
};
