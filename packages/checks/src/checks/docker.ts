import type { CheckDefinition } from "../types.js";

export const dockerCheck: CheckDefinition = {
  name: "Docker",
  async run(options) {
    const versionResult = await options.exec("docker", ["--version"]);
    if (!versionResult.ok) {
      return {
        name: "Docker",
        status: "warning",
        message: "Docker was not found",
        details: [versionResult.stderr || "Install Docker Desktop"],
        suggestedFix: "Install Docker Desktop"
      };
    }

    const daemonResult = await options.exec("docker", ["info"]);
    if (!daemonResult.ok) {
      return {
        name: "Docker",
        status: "fail",
        message: "Docker is installed but the daemon is not running",
        details: [daemonResult.stderr || "Start Docker Desktop"],
        suggestedFix: "Start Docker Desktop"
      };
    }

    return {
      name: "Docker",
      status: "pass",
      message: versionResult.stdout.trim(),
      details: []
    };
  }
};
