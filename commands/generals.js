import { SlashCommandBuilder } from "discord.js";

export const commands = {
  ping: {
    data: new SlashCommandBuilder().setName("ping").setDescription("Send a report of latency"),
    execute: async (interaction) => {
      const sent = await interaction.reply({ content: "🛰️ Pinging...", fetchReply: true });
      await interaction.editReply(
        `\n\n🛰️ Latency: **${sent.createdTimestamp - interaction.createdTimestamp}ms**`
      );
    },
  },
  status: {
    data: new SlashCommandBuilder().setName("status").setDescription("Send a status report"),
    execute: async (interaction) => {
      await interaction.reply({
        content: "Status",
      });
    },
  },
};
