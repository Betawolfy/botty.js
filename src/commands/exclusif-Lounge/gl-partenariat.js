const Discord = require("discord.js");
const logger = require("../../utils/logger");

/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "1 - 2 partenariat avec mention partenariat",
	async execute(message, args) {
		if (message.guild.id !== "917422309969625088") return message.reply(":x: Votre serveur n'est pas autorisé à utiliser cette commande. ");
		
		const userMentionInArgs = args.shift();
		if (!userMentionInArgs) {
			return await message.reply({
				content: "Utilisateur introuvable ! syntaxe: `*gl-partenariat <mention du partenaire>`"
			});
		}

		const userTopart = 
			message.guild.members.cache.find(member => member.user == message.mentions.users.first())
			|| message.guild.members.get(userMentionInArgs);
		// const partReason = args.join(" ");

		logger.info(`Service partenariat - un partenariat sans mention à été réalisé par ${message.author.username} sur Gloomy lounge. `);

		// On supprime le message original.
		await message.delete();

    const Mgloochannel = message.guild.channels.cache.get('917422311869665291');
        Mgloochannel.send(`Service partenariat - un partenariat sans mention à été réalisé par ${message.author.username} avec ${userTopart} `);

		const partglooEmbed = new Discord.MessageEmbed()
			.setColor("#fadce6")
			.setTitle("・🎐୨ Nouveau Partenariat ୧🎐・")
			.setAuthor("꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚", message.client.application.iconURL, "https://botty.ga/")
			.setDescription("꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚**\n"
				+ `**꒰<:P_WhiteSparkle:916959466145071105>꒱ Partenariat réalisé avec ${userTopart} **\n`
				+ "**꒰<:H_HeartBubbleGum:916661909271506995>꒱ Mention : partenariat.**\n"
				+ `**꒰<:P_WhiteSparkle:916959466145071105>꒱ Partenariat géré par ${message.author.username}**\n`
				+ "**꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚**\n"
				+ "**꒰<:P_PinkGirlSip:916959365578248213>꒱ Merci de ce partenariat !**\n"
			)
			.setFooter("Tu veux faire un partenariat avec nous? Va dans le salon ticket et cherche ceux pour les partenariats.");
    message.channel.send("<@&924000170537009202>");
		message.channel.send({
			embeds: [partglooEmbed],
			ephemeral: true
		});
	}
};
