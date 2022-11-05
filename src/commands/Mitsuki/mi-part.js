const Discord = require("discord.js");
const logger = require("../../utils/logger");
const partlogger = require("../../utils/partlogger");
/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "1 - 1 partenariat avec la mention partenariat.",
	async execute(message, args) {
		if (message.guild.id !== "1038151652819075266") return message.reply(":x: Votre serveur n'est pas autorisé à utiliser cette commande. ");
		
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

		logger.info(`Service partenariat - un partenariat avec la mention everyone à été réalisé par ${message.author.username}`);
    partlogger.info(`Service partenariat - un partenariat avec la mention everyone à été réalisé par ${message.author.username} sur le serveur ${message.guild.name}`);

		// On supprime le message original.
		await message.delete();
/*
let role = message.guild.roles.cache.find(r => r.id === "1028211812019212288");
// Add role to the member
await userTopart.roles.add(role);
*/
 const Mchannel = message.guild.channels.cache.get('1038394311382933565');
        Mchannel.send(`Service partenariat - un partenariat avec la mention partenariat à été réalisé par ${message.author.username} avec ${userTopart}`);
    
    
		const partEmbed = new Discord.MessageEmbed()
			.setColor("#e2a6e7")
			.setTitle("﹒൭˚ Un Nouveau Partenariat!")
      .setImage("https://media.tenor.com/vlEdQPI9QIIAAAAC/kanna-eating.gif")
			.setAuthor("╰ ╴▸   .˚ ⤹ ❝ mais que vois-je? ︶꒷꒦", message.client.application.iconURL, "https://unusualpaltformgame.valv0fluttershy.repl.co/")
			.setDescription(`**\ 🌸◞ ꒷꒦﹕**Oh! Merci gentil(le) personne! ** ! ₊˚ᗢ**\n`
      + `**・‿︵‿︵‿︵๑‧˚₊꒷︶꒦꒷︶**\n`
      + `**‧₊꒷ ʚ\ 🍼❜﹕*Partenariat réalisé avec ${userTopart} * ! ꒷₊˚**\n`
      + `**⌗・Mention : Partenariat** ꒰\ 🌊꒷꒦**\n`
      + `**꒷꒦ __Géré par : ${message.author.username} __! ⸝⸝ ‧˚.**\n`
      + `**‧₊꒷ ʚ\ 🦋❜﹕Merci de t'être associé.e à nous ! ꒷₊˚**\n`
      + `╰ ๑ ‧ ₊˚ ︶꒷꒦︶︶꒷︶꒷꒦ ⊹ ₊˚  `

			)
			.setFooter("Tu veux faire un partenariat avec nous? Va dans le salon ticket et cherche ceux pour les partenariats.");

		message.channel.send("<@&1038151652819075272>");
		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
