import net from "node:net";
import type { CheckDefinition } from "../types.js";

async function isPortInUse(port: number): Promise<boolean> {
  return await new Promise((resolve) => {
    const server = net
      .createServer()
      .once("error", () => resolve(true))
      .once("listening", () => {
        server.close(() => resolve(false));
      })
      .listen(port, "127.0.0.1");
  });
}

export const portsCheck: CheckDefinition = {
  name: "Ports",
  async run(options) {
    const inUse: number[] = [];

    for (const port of options.ports) {
      if (await isPortInUse(port)) {
        inUse.push(port);
      }
    }

    if (inUse.length === 0) {
      return {
        name: `Port ${options.ports.join(", ")}`,
        status: "pass",
        message: "Checked ports are available",
        details: []
      };
    }

    const firstPort = inUse[0];
    return {
      name: `Port ${firstPort}`,
      status: "warning",
      message: "Port is already in use",
      details: inUse.map((port) => `Port ${port} is currently in use`),
      suggestedFix: `Stop the process using port ${firstPort}`,
      metadata: { portsInUse: inUse.join(",") }
    };
  }
};
