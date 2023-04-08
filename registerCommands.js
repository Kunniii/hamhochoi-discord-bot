import { REST, Routes } from "discord.js";
import { TOKEN, APPLICATION_ID } from "./utils/env.js";
import { commands } from "./commands/generals.js";
const rest = new REST({ version: 10 }).setToken(TOKEN);

const slashCommands = [];

for (const name in commands) {
  const command = commands[name];
  slashCommands.push(command.data.toJSON());
}

(async () => {
  try {
    console.log(`Registering ${slashCommands.length} commands!`);
    const data = await rest.put(Routes.applicationCommands(APPLICATION_ID), {
      body: slashCommands,
    });
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (err) {
    console.log(err.message);
  }
})();
