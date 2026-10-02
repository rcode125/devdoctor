import { Command } from "commander";
import { checkCommand } from "./commands/check.js";
import { versionCommand } from "./commands/version.js";

export function createCli() {
  const program = new Command();

  program.name("devdoctor").description("Developer environment diagnostics");
  program.addCommand(checkCommand());
  program.addCommand(versionCommand());

  return program;
}
