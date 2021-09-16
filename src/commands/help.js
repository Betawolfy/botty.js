const Discord = require("discord.js");

module.exports = {
	data: {
		name: "help",
		description: "Page d'aide globale"
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		const helpEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Page d'aide globale")
			.setURL("https://botty.ga/")
			.setAuthor("Botty.js v0.2-bêta", message.client.application.iconURL(), "https://botty.ga/")
			.setDescription(
				"**Commandes pour le staff:** \\*help-staff\n"
				+ "**Commandes pour les utilitaires:** \\*help-utility\n"
				+ "**Commandes pour les tickets:** Indisponible\n"
				+ "**Aide pour le premium:** Indisponible"
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

		message.channel.send({
			embeds: [helpEmbed],
			ephemeral: true
		});
	}
};