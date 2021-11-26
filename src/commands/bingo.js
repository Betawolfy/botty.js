const logger = require("../utils/logger");
const { MessageEmbed } = require("discord.js");
const pkg = require("../../package.json");

module.exports = {
	data: {
		name: "bingo",
		description: "tirage au sort pour les missions",
		category: "₊˚દ Exclusif Teko's Coffee"
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		
		const responses = [
			"**Si les 2 chiffres sont identiques, tu recevras la somme de 100 points pour ton clan et 300 si les 3 sont identiques ! Rends-toi dans ╰・୭︰📮﹒rapports୧﹒ avec une preuve et le staff te donneras le lot (≧▽≦)/.**",
			"**Si les 2 chiffres sont identiques, tu recevras la somme de 100$ et 600$ si les 3 sont identiques ! Rends-toi dans ╰・୭︰📮﹒rapports୧﹒ avec une preuve et le staff te donneras le lot (≧▽≦)/.**",
		];
		const random = Math.floor((Math.random() * 10) + 1);
		const random1 = Math.floor((Math.random() * 10) + 1);
		const random2 = Math.floor((Math.random() * 10) + 1);

	
		const bingoEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Merci de voter pour botty!")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				"‧˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚‧\n"
				+ "Voici ton tirage.\n"
				+ responses
		)
			.addFields(
				{
					name: "numéro 1",
					value: random,
					inline: true
				},
				{
					name: "numéro 2",
					value: random1,
					inline: true
				},
				{
					name: "numéro 3",
					value: random2,
					inline: true
				}
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

	message.channel.send({
		embeds: [bingoEmbed],
		ephemeral: true
	});
	}
};