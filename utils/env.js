import dotenv from "dotenv";
dotenv.config();

export const LISTEN_TO = process.env.LISTEN_TO;
export const APPLICATION_ID = process.env.APPLICATION_ID;
export const PUBLIC_KEY = process.env.PUBLIC_KEY;
export const TOKEN = process.env.TOKEN;
export const GUILD_ID = process.env.GUILD_ID;
export const HOST = process.env.CYCLIC_URL || "http://localhost";
export const PORT = process.env.PORT || 8999;

console.log(LISTEN_TO);
