const Discord = require("discord.js");
const logger = require("../utils/logger");

module.exports = {
	data: {
		name: "partenariat-none",
		description: "1 - 2 partenariat sans mention",
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
			.setColor("#dfb7e2")
			.setTitle("﹒൭˚ Un nouveau partenariat!")
			.setAuthor("╰ ╴▸   .˚ ⤹ ❝ mais que vois-je? ︶꒷꒦", message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				"**・↓<a:A_ValideRose:902448325733781524>↓₍ᐢᐢ₎ ꒰ nous avons un nouveau partenaire de confiance! ♡ ꒱ ᓚꕤꕤ﹕๑₊˚**\n"
        +"**‧˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚‧**\n"
        +`**╭₊꒷︶ଓ  <a:A_InterrogationPink:902491970713300992> ✦✦ ﹕partenariat réalisé avec ${userTopart} **\n`
        +"**┊ᓚ𖦹 ୨<a:A_maryetmudae:902449424771457024> ୧₊˚𓂃 mention: aucune **\n"
        +`**┊₊˚ꕤꕤ﹕⌗<a:A_CatHeart:901163577250021428> ﹒ ﹕ ̟乀 partenariat géré par: ${message.author.username}**\n`
        +`**╰ ୨<a:A_Multi_stars:902276277124354128>﹕๑‧₊˚┈ ᘏᘏ petit message: ${partReason.length < 1 ? "Merci de vous être associé.e à nous!" : partReason}**\n`
			)
			.setFooter("Vous voulez faire un partenariat avec nous? Allez dans le salon ticket et cherchez ceux pour les partenariats.");

		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
