const Discord = require("discord.js");
const pkg = require("../../package.json");

module.exports = {
	data: {
		name: "support",
		description: "commande pour savoir tout les liens."
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		const contactEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Support de Botty ")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				"**Site internet:** \\ https://botty.ga/ \n"
				+ "**lien vers le support** \\ https://discord.gg/5AFCw3Nc57 \n"
				+ "**Twitter Status:** \\ https://twitter.com/BottyStatus \n"
				+ "**GitHub:** \\ https://github.com/betawolfy/botty.js "
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

		message.channel.send({
			embeds: [contactEmbed],
			ephemeral: true
		});
	}
};