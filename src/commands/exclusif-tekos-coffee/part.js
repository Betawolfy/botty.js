const Discord = require("discord.js");
const logger = require("../../utils/logger");
const partlogger = require("../../utils/partlogger");
/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "2 - 2 partenariat avec la mention partenariat",
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

		logger.info(`Service partenariat - un partenariat avec la mention partenariat à été réalisé par ${message.author.username}`);
    partlogger.info(`Service partenariat - un partenariat avec la mention partenariat à été réalisé par ${message.author.username} sur le serveur ${message.guild.name} (teko coffee) `);

		// On supprime le message original.
		await message.delete();

let role = message.guild.roles.cache.find(r => r.id === "897416194582257675");
// Add role to the member
await userTopart.roles.add(role);

 const Mchannel = message.guild.channels.cache.get('897416454557814795');
        Mchannel.send(`Service partenariat - un partenariat avec la mention partenariat à été réalisé par ${message.author.username} avec ${userTopart}`);
    
const partEmbed = new Discord.MessageEmbed()
			.setColor("#dfb7e2")
      //.setThumbnail(message.author.avatarURL())
			.setTitle("ʚ﹒꒷<a:A_LuneKiBrille:901163601711226952>꒦꒷﹒Oh, un partenariat sauvage vient d'apparaitre !𑁦୧")
			//.setAuthor("╰ ╴▸︶꒷꒦", message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
        /*
				"**・↓<a:A_ValideRose:902448325733781524>↓₍ᐢᐢ₎ ꒰ nous avons un nouveau partenaire de confiance! ♡ ꒱ ᓚꕤꕤ﹕๑₊˚**\n"
        +"**‧˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚‧**\n"
        +`**╭₊꒷︶ଓ  <a:A_InterrogationPink:902491970713300992> ✦✦ ﹕partenariat réalisé avec ${userTopart} **\n`
        +"**┊ᓚ𖦹 ୨<a:A_maryetmudae:902449424771457024> ୧₊˚𓂃 mention: aucune **\n"
        +`**┊₊˚ꕤꕤ﹕⌗<a:A_CatHeart:901163577250021428> ﹒ ﹕ ̟乀 partenariat géré par: ${message.author.username}**\n`
        +`**╰ ୨<a:A_Multi_stars:902276277124354128>﹕๑‧₊˚┈ ᘏᘏ petit message: ${partReason.length < 1 ? "Merci de vous être associé.e à nous!" : partReason}**\n`
        */
"**<a:A_NezukoJumping:902448560593829918>◞ ꒷꒦﹕Voici quelques informations ! ₊˚ᗢ **\n"
+"** ・‿︵‿︵‿︵๑‧˚₊꒷︶꒦꒷︶ **\n"
+`** ‧₊꒷ ʚ <a:A_Multi_vomi:902450962436882482>❜﹕Partenariat réalisé avec ${userTopart} ! ꒷₊˚ **\n`
+`** ⌗・Mention : partenariat ꒰ <a:A_ArcEnCiel:901397558360932432>꒷꒦ **\n`
+`** ꒷꒦ Géré par : ${message.author.username} ! ⸝⸝ ‧˚. **\n`
+`** ‧₊꒷ ʚ <a:A_PapillonsRoseClair:902491951373373530>❜﹕À la prochaine pour de nouveaux partenariats ! ꒷₊˚ **\n`
+`** ╰ ๑ ‧ ₊˚ ︶꒷꒦︶︶꒷︶꒷꒦ ⊹ ₊˚ <a:A_SparklesWhite:901398531393355786> **`
			)
	.setFooter("Vous voulez que je fasse le même message sur votre serveur? allez voir wolfy en mp.");

		message.channel.send("<@&897416241784954912>");
		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
