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
		
		const userMentionInArgs = args.shift();
			if (!userMentionInArgs) {
			return await message.reply({
				content: "Utilisateur introuvable !"
			});
		}

		const userTopart = 
			message.guild.members.cache.find(member => member.user == message.mentions.users.first())
			|| message.guild.members.get(userMentionInArgs);
		const partReason = args.join(" ");

		
		const partEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Un nouveau partenariat!")
			.setURL("https://botty.ga/")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
        "・┈・₊˚⿻ ・↓🧺↓₍ᐢᐢ₎ ꒰  nous avons un nouveau partenaire de confience!  !! ♡ ꒱ ᓚꕤꕤ﹕๑₊˚\n"
        +"\n"
        +"╭₊꒷︶ଓ 🌷✦✦ ﹕partenariat réalisé avec ${userTopart} \n"
        +"┊ᓚ𖦹 ୨🍓୧₊˚𓂃 mention: à mettre à la fin des tests (ici partenariat) \n"
        +"┊₊˚ꕤꕤ﹕⌗🌈︵ ︵ partenariat géré par: ${message.author.username}\n"
        +"╰ ୨🌱﹕๑‧₊˚┈ ᘏᘏ petit message: ${partReason.length < 1 ? "Merci de vous être accocier à nous!" : warnReason}\n"
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
