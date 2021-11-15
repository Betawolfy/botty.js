const Discord = require("discord.js");
const logger = require("../utils/logger");

module.exports = {
	data: {
		name: "partenariat-none",
		description: "partenariat sans mention",
		category: "Exclusif Teko's Coffee"
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @returns {Promise<void>}
	 */
	async execute(message, args) {
		if (message.guild.id !== "861611425524219924") return message.reply(":x: Votre serveur n'est pas autorisé à utiliser cette commande. ");
		
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

		logger.info(` Service partenariat - un partenariat avec la mention partenariat à été réalisé par ${message.author.username}`);

    // On supprime le message original.
		await message.delete();
    
		const partEmbed = new Discord.MessageEmbed()
			.setColor("#f5af96")
			.setTitle("﹒൭˚ Un nouveau partenariat!")
			.setAuthor("╰ ╴▸   .˚ ⤹ ❝ mais que vois-je? ︶꒷꒦", message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				"**・↓🧺↓₍ᐢᐢ₎ ꒰ nous avons un nouveau partenaire de confiance! ♡ ꒱ ᓚꕤꕤ﹕๑₊˚**\n"
        +"\n"
        +`**╭₊꒷︶ଓ 🌷✦✦ ﹕partenariat réalisé avec ${userTopart} **\n`
        +"**┊ᓚ𖦹 ୨🍓୧₊˚𓂃 mention: aucune **\n"
        +`**┊₊˚ꕤꕤ﹕⌗🌈︵ ︵ partenariat géré par: ${message.author.username}**\n`
        +`**╰ ୨🌱﹕๑‧₊˚┈ ᘏᘏ petit message: ${partReason.length < 1 ? "Merci de vous être associés à nous!" : partReason}**\n`
			)
			.setFooter("Tu veux faire un partenariat avec nous? Va dans le salon ticket et cherche ceux pour les partenariats.");

		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
