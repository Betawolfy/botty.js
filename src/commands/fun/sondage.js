const { MessageEmbed } = require("discord.js");
const pkg = require("../../../package.json");

module.exports = {
	commandDescription: "Créer un sondage 'OUI ou NON'",
	async execute(message, args) {
		let textToSay = args.join(" ");
		if (textToSay.length <= 0) return;

		// On supprime le message original.
		await message.delete();
		
		const embed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Sondage: ")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				`${textToSay} \n`
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

		// On envoie celui que dira le bot.
		await message.channel.send({
			embeds: [embed]
		});
		await message.react("🤔");
	}
};
