const Discord = require("discord.js");
const pkg = require("../../../package.json");

/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Optimisation de la sécurité",
	async execute(message) {
		const optiEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Botty est un bot de sécurité. Il est donc nécessaire, pour garantir le fonctionnement des modules, de donner à botty certaines permissions. Nous avons imaginé 4 configurations possibles et les conséquences entraînés:")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				" :x: | Aucune permission de moderation:\n" 
				+ "> Sécurité de la part de botty: nul \n" 
				+ "> Souscription au programme Bak-secure: inéligible.\n"
				+ "> Autres: auto-leave du bot si le problème n'est pas réglé dans les 3 jours suivant le join du bot. \n"
				+ "** **\n"
				+ ":warning: | Permission minimale: \n"
				+ "> Sécurité de la part de botty: minimale \n"
				+ "> Souscription au programme Bak-secure: inéligible \n"  
				+ "** **\n"
				+ ":white_check_mark: | Permission optimale (perm admin): \n"
				+ "> Sécurité de la part de botty: moyenne \n"
				+ "> Souscription au programme Bak-secure: éligible \n"
				+ "** **\n"
				+ ":shield:| Permission maximale (perm admin + rôle personnel du bot au-dessus des modo-admin (pour anti-trahison)): \n"
				+	"> Sécurité de la part de Botty: maximale. \n"
				+ "> Souscription au programme Bak-secure: imposé \n"
			)
			.setFooter("les serveurs inscrits dans _serverlist (bientôt dispo) peuvent voir leurs niveau grâce au émoji qui précède les optimisations.");

		message.channel.send({
			embeds: [optiEmbed]
		});
	}
};
