module.exports = {
	data: {
		name: "ping",
		description: "Donne le ping du bot.",
		category: "utility",
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>} 
	 */
	async execute(message) {
		const pongMessage = await message.channel.send("Pong !");
		const latence = pongMessage.createdTimestamp - message.createdTimestamp;

		await pongMessage.edit(`Pong !\nLatence HTTP: ${latence}ms\nLatence WS: ${message.client.ws.ping}ms\nStatus: https://bottybot.statuspage.io`);
	}
};
