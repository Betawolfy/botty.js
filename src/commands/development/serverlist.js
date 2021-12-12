const logger = require("../../utils/logger");

/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Tout les serveurs possédant Botty.",
	async execute(message) {
		if (message.guild.id !== "596306506819960832") return message.reply(":x: Votre serveur n' est pas autorisé à utiliser cette commande.");

		logger.info("info", `[test-message] Test envoyé par ${message.author.username} reçu !`);
	}
};
