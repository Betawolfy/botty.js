const Discord = require("discord.js");
const pkg = require("../../package.json");

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
		const partEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Page d'aide globale")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
        "・┈・₊˚⿻ ・↓🧺↓₍ᐢᐢ₎ ꒰ text !! ♡ ꒱ ᓚꕤꕤ﹕๑₊˚"
        +" "
        +"╭₊꒷︶ଓ 🌷✦✦ ﹕text"
        +"┊ᓚ𖦹 ୨🍓୧₊˚𓂃 text"
        +"┊₊˚ꕤꕤ﹕⌗🌈︵ ︵ text"
        +"╰ ୨🌱﹕๑‧₊˚┈ ᘏᘏ text"
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
