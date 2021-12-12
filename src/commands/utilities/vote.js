const { MessageEmbed } = require("discord.js");
const pkg = require("../../../package.json");

/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Lien pour voter pour le bot",
	async execute(message) {
		const voteEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Merci de voter pour botty!")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				"‧˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚‧\n"
			+ "**⊹ ˚. Botty est jeune, alors voter pour lui nous aidera à le rendre connu!"
			+ ":warning: Attention: apparement, il y aurait des pubs avent de pouvoir voter. sachez que ceci est entièrment pour top.gg et les créateurs de bot n'ont pas la possiblité de les retirer pour le moment.** \n"
			+ "**₊˚દ Voici le lien:** \n"
			+ "﹒ ﹕ ̟乀  https://top.gg/bot/480032260993581056/vote \n"
			+ "**ʚ . ⋆ ₊ —・・₊˚๑・—・— ๑ ˖**\n"
			+ "┊ ⋆ 。 Données de votes ⊹ ˚. ┊\n"
			+ "\n"
			)
			.addFields(
				{
					name: "Nombre de votes:",
					value: "https://top.gg/api/bots/480032260993581056/check?userId=" + message.author.id,
					inline: false
				},
				{
					name: "reward",
					value: "aucun pour le moment",
					inline: false
				}
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

		message.channel.send({
			embeds: [voteEmbed],
			ephemeral: true
		});
	}
};