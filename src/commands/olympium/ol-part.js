const Discord = require("discord.js");
const logger = require("../../utils/logger");
const partlogger = require("../../utils/partlogger");
/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "1 - 1 partenariat avec la mention everyone",
	async execute(message, args) {
		if (message.guild.id !== "911369501508009996") return message.reply(":x: Votre serveur n'est pas autorisé à utiliser cette commande. ");
		
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

 const Mchannel = message.guild.channels.cache.get('914235577400967218');
        Mchannel.send(`Service partenariat - un partenariat avec la mention partenariat à été réalisé par ${message.author.username} avec ${userTopart}`);
    */
const partEmbed = new Discord.MessageEmbed()
			.setColor("#f164c1")
      //.setThumbnail(message.author.avatarURL())
			.setTitle("Nouveau Partenariat!")
			//.setAuthor("╰ ╴▸︶꒷꒦", message.client.application.iconURL, "https://botty.ga/")
			.setDescription(`✧˖°࿐ :flag_gr: New partnership has been made !\n\n`
            +`-        ˚˖୧ ‘ mention: @everyone 𐩐꒷꒦\n`
            +`✘´ Partnership with: ${userTopart}\n`
            +`✘´ Partnership managed by: ${message.author.username}\n\n`
            +`    <@480032260993581056> says see you soon ₊˚ˑ༄ؘ・\n`
            +`｡･ﾟ♡ﾟ･｡:amphora:｡･ﾟ♡ﾟ･｡:classical_building:˙˖˚♡ﾟ･:flag_gr:｡･ﾟ♡ﾟ･｡`
                )
	.setFooter("Vous voulez que je fasse le même message sur votre serveur? allez voir wolfy en mp.");

		message.channel.send("@everyone");
		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
