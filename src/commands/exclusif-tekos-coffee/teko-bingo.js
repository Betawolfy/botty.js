const { MessageEmbed } = require("discord.js");
const pkg = require("../../../package.json");

/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Tirage au sort pour les missions.",
	async execute (message) {
		// Définir le lot donné.
		const responses = [
			"**Si les 2 chiffres sont identiques, tu recevras la somme de 100 points pour ton clan et 300 si les 3 sont identiques ! Rends-toi dans <#897416422655926272> avec une preuve et le staff te donneras le lot (≧▽≦)/.**",
			"**Si les 2 chiffres sont identiques, tu recevras la somme de 100$ et 600$ si les 3 sont identiques ! Rends-toi dans <#897416422655926272> avec une preuve et le staff te donneras le lot (≧▽≦)/.**",
		];

		// Ceci sert à donner un nombre aléatoire. 
		const randomNumber = () => Math.floor((Math.random() * 10) + 1);

		// Bingo Embed. 
		const bingoEmbed = new MessageEmbed()
			.setColor("#f8baff")
			.setTitle("﹒ ﹕ ̟乀 Bingo! ✦ . *")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				"‧˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚‧\n"
				+ "₊˚ ୨ Voici ton tirage.\n"
				+ responses[Math.floor(Math.random() * responses.length)]
			)
			.addFields(
				{
					name: "=・Numéro 1",
					value: randomNumber(),
					inline: true
				},
				{
					name: "・୨・ Numéro 2 ・୨・",
					value: randomNumber(),
					inline: true
				},
				{
					name: "Numéro 3 ───・",
					value: randomNumber(),
					inline: true
				}
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalitées sont susceptibles de ne pas être encore disponible.");

		message.channel.send({
			embeds: [bingoEmbed]
		});
	}
};