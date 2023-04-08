import { commands as generalsCommands } from "./commands/generals.js";
import { TOKEN, LISTEN_TO, APPLICATION_ID } from "./utils/env.js";
import { Client, Events, GatewayIntentBits, ActivityType, REST, Routes } from "discord.js";
import { getCategory } from "./utils/index.js";

//#region BEGIN REGISTER COMMAND
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
//#endregion END REGISTER COMMAND

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const handleInteraction = async (interaction) => {
  const { username: userAccount, discriminator: userId } = interaction.user;
  const { commandName } = interaction;
  console.log(`[${userAccount}#${userId}] [${commandName}] [${Date.now()}]`);
  const category = getCategory(interaction);
  switch (category) {
    case "generals":
      await generalsCommands[commandName].execute(interaction);
      break;
    default:
      await interaction.reply({ content: "Unknown Command!", ephemeral: true });
  }
};
client.on(Events.InteractionCreate, handleInteraction);

client.login(TOKEN);
client.once(Events.ClientReady, (c) => {
  console.log(`${c.user.tag}\n=================\n`);
  client.user.setPresence({
    activities: [
      {
        name: LISTEN_TO,
        type: ActivityType.Listening,
      },
    ],
    status: "online",
  });
});
