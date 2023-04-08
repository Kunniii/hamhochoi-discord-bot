import { commands as generals } from "../commands/generals.js";

const generalCommands = Object.keys(generals);

export function getCategory(interaction) {
  const { commandName } = interaction;
  if (generalCommands.includes(commandName)) {
    return "generals";
  }
}
