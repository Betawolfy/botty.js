module.exports = {
	data: {
		name: "lock",
		description: "Vérouiller le channel, où le message est envoyé, pour tout le monde."
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		await message.channel.updateOverwrite(
			message.channel.guild.roles.everyone,
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			}
		);

		await message.channel.send(`Le salon **${message.channel.name}** à été bloqué avec succès.`);
	}
};
