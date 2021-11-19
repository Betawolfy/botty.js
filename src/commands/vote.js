const logger = require("../utils/logger");
const { MessageEmbed } = require("discord.js");
const pkg = require("../../package.json");


module.exports = {
	data: {
		name: "vote",
		description: "redirection pour voter pour le bot",
		category: "Utilitaires"
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		const voteEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Merci de voter pour botty!")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				"‧˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚‧\n"
			+ "⊹ ˚. Botty est jeune, alors voter pour lui nous aidera à le rendre connu!"
			+ ":warning: Attention: apparement, il y aurait des pubs avent de pouvoir voter. sachez que ceci est entièrment pour top.gg et les créateurs de bot n'ont pas la possiblité de les retirer pour le moment. \n"
		  + "₊˚દ Voici le lien: \n"
			+ "﹒ ﹕ ̟乀  https://top.gg/bot/480032260993581056/vote \n"
			+ "ʚ . ⋆ ₊ —・・₊˚๑・—・— ๑ ˖\n"
			+ "┊ ⋆ 。 Données de votes ⊹ ˚. ┊\n"
			+ "\n"
		)
			.addFields(
				{
					name: "nombre de votes:",
					value: "indisponible",
					inline: true
				},
				{
					name: "reward",
					value: "aucun pour le moment",
					inline: true
				}
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

	message.channel.send({
		embeds: [voteEmbed],
		ephemeral: true
	});
	}
};