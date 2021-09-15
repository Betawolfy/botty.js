module.exports = {
	data: {
		name: "lock",
		description: "Permet de vérouiller le salon sélectionné."
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
