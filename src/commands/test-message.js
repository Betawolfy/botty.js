const logger = require("../utils/logger");

module.exports = {
	data: {
		name: "test-message",
		description: "Vérifie si le bot est en ligne ou non.",
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		await message.reply({
			content: "Le bot est bien en ligne !",
			ephemeral: true
		});

		logger.info("info", `[test-message] Test envoyé par ${message.author.username} reçu !`);
	}
	//fin de execute
};
//fin de module.exports
