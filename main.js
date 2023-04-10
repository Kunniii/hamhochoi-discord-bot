// const { clientId, guildId, token, publicKey } = require('./config.json');

import { APPLICATION_ID, GUILD_ID, PUBLIC_KEY, TOKEN, HOST, PORT } from "./utils/env.js";
import axios from "axios";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from "discord-interactions";

const app = express();
// app.use(bodyParser.json());

const discord_api = axios.create({
  baseURL: "https://discord.com/api/v10",
  timeout: 3000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Authorization",
    Authorization: `Bot ${TOKEN}`,
  },
});

app.post("/interactions", verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    console.log(interaction.data.name);
    if (interaction.data.name == "yo") {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Yo @${interaction.member.user.username}#${interaction.member.user.discriminator}!`,
        },
      });
    }

    if (interaction.data.name == "ping") {
      const sent = await res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `PING @${interaction.member.nick}!`,
        },
      });
      console.log(sent);
    }

    if (interaction.data.name == "dm") {
      // https://discord.com/developers/docs/resources/user#create-dm
      const c = (
        await discord_api.post("/users/@me/channels", {
          recipient_id: interaction.member.user.id,
        })
      ).data;
      try {
        // https://discord.com/developers/docs/resources/channel#create-message
        const result = await discord_api.post(`/channels/${c.id}/messages`, {
          content:
            "Yo! I got your slash command. I am not able to respond to DMs just slash commands.",
        });
        console.log(result.data);
      } catch (e) {
        console.log(e);
      }

      return res.send({
        // https://discord.com/developers/docs/interactions/receiving-and-responding#responding-to-an-interaction
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "👍",
        },
      });
    }
  }
});

app.get("/register_commands", async (req, res) => {
  const slash_commands = [
    {
      name: "yo",
      description: "replies with Yo!",
      options: [],
    },
    {
      name: "dm",
      description: "sends user a DM",
      options: [],
    },
    {
      name: "ping",
      description: "replies the ping between your Discord server to BOT",
      options: [],
    },
  ];
  try {
    // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
    const discord_response = await discord_api.put(
      `/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`,
      slash_commands
    );
    console.log(discord_response.data);
    return res.send("commands have been registered");
  } catch (e) {
    console.error(e.code);
    console.error(e.response?.data);
    return res.send(`${e.code} error from discord`);
  }
});

app.get("/", async (req, res) => {
  return res.send("Follow documentation ");
});

app.listen(PORT, (e) => {
  if (e) {
    console.log(e.message);
  } else {
    console.log(`Go to ${HOST}:${PORT}/register_commands`);
  }
});
