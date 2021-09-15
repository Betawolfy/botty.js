module.exports = {
	data: {
		name: "unlock",
		description: "Permet de dévérouiller le salon sélectionné."
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		await message.channel.updateOverwrite(
			message.channel.guild.roles.everyone,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			}
		);

		await message.channel.send(`Le salon **${message.channel.name}** à été débloqué avec succès.`);
	}
};