const { MessageEmbed } = require("discord.js");

/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Donne le ping et status du bot.",
	async execute(message) {
		const pongMessage = await message.channel.send("Reçu ! Traitement en cours...");
		const latence = pongMessage.createdTimestamp - message.createdTimestamp;

		const embed = new MessageEmbed()
			.setTitle("Pong !")
			.setDescription("Informations sur la latence et le status actuel de Botty.")
			.setFields([
				{ name: "Latence HTTP", value: `${latence}ms` },
				{ name: "Latence WS", value: `${message.client.ws.ping}ms` }
			])
			.setFooter("Status des serveurs: https://bottybot.statuspage.io");

		await pongMessage.edit({
			content: null,
			embeds: [embed]
		});
	}
};