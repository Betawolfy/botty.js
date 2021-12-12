const Discord = require("discord.js");
const pkg = require("../../../package.json");

/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Créer tout les objets necessaires au bon fonctionnement du bot.",
	async execute(message) {	
		const setupEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Ce serveur est protégé par Botty Bak-Ban.")
			.setURL("https://botty.ga/")
			.setThumbnail("")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				"tout manquement au règles et aux conditions d'utilisation de botty entrainera un bannissement permanent"
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");
			
		message.channel.send({
			embeds: [setupEmbed],
			ephemeral: true
		});
	}
};
