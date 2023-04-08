import { commands as generalsCommands } from "./commands/generals.js";
import { TOKEN, LISTEN_TO } from "./utils/env.js";
import { Client, Events, GatewayIntentBits, ActivityType } from "discord.js";
import { getCategory } from "./utils/index.js";

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
