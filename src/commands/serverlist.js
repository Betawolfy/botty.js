const logger = require("../utils/logger");

module.exports = {
	data: {
		name: "serverlist",
		description: "Tout les serveurs.",
		category: "Développement"
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		if (message.guild.id !== "596306506819960832") return message.reply(":x: Votre serveur n' est pas autorisé à utiliser cette commande.");

		logger.info("info", `[test-message] Test envoyé par ${message.author.username} reçu !`);
	}
};
