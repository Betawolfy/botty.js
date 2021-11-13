const logger = require("../utils/logger");

module.exports = {
	data: {
		name: "test-message",
		description: "Vérifie si le bot est en ligne ou non.",
		category: "Utilitaires"
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		if (message.guild.id !== "596306506819960832") return message.reply(":x: Votre serveur n'est pas autorisé à utiliser cette commande.");
		await message.reply({
			content: "Le bot est bien en ligne !"
		});

		logger.info(`[test-message] Test envoyé par ${message.author.username} reçu !`);
	}
};