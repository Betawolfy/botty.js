const Discord = require("discord.js");
const pkg = require("../../package.json");

module.exports = {
	data: {
		name: "optiwork",
		description: "Page d'aide globale",
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		const helpEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Botty est un bot de sécurité. Il est donc nécessaire, pour garantir le fonctionnement des modules, de donner à botty certaines permissions. Nous avons imaginé 4 configurations possibles et les conséquences entraînés:")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				":x:| aucune permission de moderation:\n" 
				+ "> Sécurité de la part de botty: nul" 
				+ "> Souscription au programme Bak-secure: inéligible.\n"
				+ "> Souscription au programme Premium: inéligible \n"
				+ "> Autres: auto-leave du bot si le problème n'est pas réglé dans les 3 jours suivant le join du bot. \n"
				+ "\n"
				
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

		message.channel.send({
			embeds: [helpEmbed],
			ephemeral: true
		});
	}
};