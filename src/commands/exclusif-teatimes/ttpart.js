const Discord = require("discord.js");
const logger = require("../../utils/logger");
const partlogger = require("../../utils/partlogger");
/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "2 - 2 partenariat avec la mention partenariat\n> usage: *ttpart-none [mention du partenaire]",
	async execute(message, args) {
		if (message.guild.id !== "762282317607206972") return message.reply(":x: Votre serveur n'est pas autorisé à utiliser cette commande. ");
		
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

		partlogger.info(`Service partenariat - un partenariat avec la mention partenariat à été réalisé par ${message.author.username} sur le serveur ${message.guild.name} (tea times)`);

		// On supprime le message original.
		await message.delete();
/*
let role = message.guild.roles.cache.find(r => r.id === "");
// Add role to the member
await userTopart.roles.add(role);
*/
 const Mchannel = message.guild.channels.cache.get('972073419074072586');
        Mchannel.send(`Service partenariat - un partenariat avec la mention partenariat à été réalisé par ${message.author.username} avec ${userTopart}`);
    
const partEmbed = new Discord.MessageEmbed()
			.setColor("#dfb7e2")
      //.setThumbnail(message.author.avatarURL())
			.setTitle("☁️  . . . ⇢ ˗ˏˋ Nouveau Partenariat ࿐ྂ")
			//.setAuthor("╰ ╴▸︶꒷꒦", message.client.application.iconURL, "https://botty.ga/")
			.setDescription(`︶︶꒦︶︶꒷꒦`
      + `**Partenariat With : ${userTopart}**\n`
      + `**Mention : partenariat**\n`
			)
    .setFooter("Merci pour ce partenariat!")
	//.setFooter("Vous voulez faire un partenariat avec nous? Allez dans le salon ticket et cherchez ceux pour les partenariats. | version test");

		message.channel.send("<@&762282317607206979>");
		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
