const Discord = require("discord.js");
const logger = require("../../utils/logger");
const partlogger = require("../../utils/partlogger");
/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "2 - 4 partenariat avec la mention everyone",
	async execute(message, args) {
		if (message.guild.id !== "996490816040226846") return message.reply(":x: Votre serveur n'est pas autorisé à utiliser cette commande. ");
		
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
    partlogger.info(`Service partenariat - un partenariat avec la mention everyone à été réalisé par ${message.author.username} sur le serveur ${message.guild.name} (hiroshi) `);

		// On supprime le message original.
		await message.delete();
/*
let role = message.guild.roles.cache.find(r => r.id === "1028211812019212288");
// Add role to the member
await userTopart.roles.add(role);

 const Mchannel = message.guild.channels.cache.get('914235577400967218');
        Mchannel.send(`Service partenariat - un partenariat avec la mention partenariat à été réalisé par ${message.author.username} avec ${userTopart}`);
    */
const partEmbed = new Discord.MessageEmbed()
			.setColor("#f164c1")
      //.setThumbnail(message.author.avatarURL())
			.setTitle("Nouveau Partenariat!")
			//.setAuthor("╰ ╴▸︶꒷꒦", message.client.application.iconURL, "https://botty.ga/")
			.setDescription(`⎧𐐪Partenariat <:coeurblanc:997161829996441630> ﹝Réalisé avec ${userTopart}﹞\n`
      +`꒷꒦₊˚✧Mention :<:coeurblanc:997161829996441630>  everyone. ꒷꒦₊˚\n`
      +`꒷꒦₊˚๑Enjoy <:grrr:997204801639153704> 𑄻\n`
      +`꒷꒦₊˚𑄻Géré par: ${message.author.username}\n`
      +`︶꒷꒦︶︶꒷︶꒷꒦ ⊹ ₊˚`

			)
	.setFooter("Vous voulez que je fasse le même message sur votre serveur? allez voir wolfy en mp.");

		message.channel.send("@everyone");
		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
