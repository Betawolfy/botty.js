const Discord = require("discord.js");
const pkg = require("../../package.json");

module.exports = {
	data: {
		name: "partenariat",
		description: "exclusivement pour le serveur teko coffee"
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		const partEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Un nouveau partenariat!")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
        "・┈・₊˚⿻ ・↓🧺↓₍ᐢᐢ₎ ꒰ text !! ♡ ꒱ ᓚꕤꕤ﹕๑₊˚\n"
        +"\n"
        +"╭₊꒷︶ଓ 🌷✦✦ ﹕text\n"
        +"┊ᓚ𖦹 ୨🍓୧₊˚𓂃 text\n"
        +"┊₊˚ꕤꕤ﹕⌗🌈︵ ︵ text\n"
        +"╰ ୨🌱﹕๑‧₊˚┈ ᘏᘏ text\n"
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
