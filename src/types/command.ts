import type { Message } from "discord.js";

export type CommandFile = {
	commandDescription: string;
	execute: (message: Message, args: string[]) => Promise<void>;
}