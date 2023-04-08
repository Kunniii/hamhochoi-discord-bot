import dotenv from "dotenv";
dotenv.config();

export const APPLICATION_ID = process.env.APPLICATION_ID;
export const PUBLIC_KEY = process.env.PUBLIC_KEY;
export const TOKEN = process.env.TOKEN;
export const GUILD_ID = process.env.GUILD_ID;

console.log(APPLICATION_ID);
