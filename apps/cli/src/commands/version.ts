import { Command } from "commander";

export function versionCommand() {
  return new Command("version")
    .description("Show CLI version")
    .action(() => {
      console.log("devdoctor 0.1.0");
    });
}
