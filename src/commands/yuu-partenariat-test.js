const Discord = require("discord.js");
const logger = require("../utils/logger");

module.exports = {
	data: {
		name: "yuu-partenariat-test",
		description: "1 - 2 partenariat avec aucune mention",
		category: "₊˚દ Exclusif Yūutsu"
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @returns {Promise<void>}
	 */
	async execute(message, args) {
		if (message.guild.id !== "912069009887879188") return message.reply(":x: Votre serveur n'est pas autorisé à utiliser cette commande. ");
		
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

		logger.info(`Service partenariat - un partenariat sans mention à été réalisé par ${message.author.username} sur Yūutsu`);

    // On supprime le message original.
		await message.delete();

    
		const partyuuEmbed = new Discord.MessageEmbed()
			.setColor("#042A5F")
			.setTitle("・🎐୨ Nouveau Partenariat ୧🎐・")
			.setAuthor("꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚", message.client.application.iconURL, "https://botty.ga/")
			.setDescription("꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚\n"
				+ `꒰<:P_WhiteSparkle:916959466145071105>꒱ Partenariat réalisé avec ${userTopart} \n`
				+ `꒰<:H_HeartBubbleGum:916661909271506995>꒱ Mention : test\n`
				+ `꒰<:P_WhiteSparkle:916959466145071105>꒱ Partenariat géré par ${message.author.username}\n`
				+ `꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚꒷꒦︶︶꒷︶꒦-♡༉⋅₊˚\n`
				+ `꒰<:P_PinkGirlSip:916959365578248213>꒱ Merci de ce partenariat !\n`
			)
			.setFooter("Tu veux faire un partenariat avec nous? Va dans le salon ticket et cherche ceux pour les partenariats.");

		message.channel.send({
			embeds: [partyuuEmbed],
			ephemeral: true
		});
	}
};
