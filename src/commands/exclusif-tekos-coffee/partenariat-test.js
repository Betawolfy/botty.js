const Discord = require("discord.js");
const logger = require("../../utils/logger");

module.exports = {
	commandDescription: "3 - 2 partenariat test.",
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

		// On supprime le message original.
		await message.delete();

let role = message.guild.roles.cache.find(r => r.id === "897416194582257675");
// Add role to the member
await userTopart.roles.add(role);

const logEmbed = new Discord.MessageEmbed()
.setColor("#f5af96")
.setTitle("﹒൭˚ Service partnenariat")
.setAuthor(`╰ ╴▸   .˚ ⤹ ❝ Partenariat géré par: ${message.author.username} ︶꒷꒦`, message.client.application.iconURL, "https://botty.ga/")
.setDescription(`ᓚ𖦹 ୨un partenariat avec la mention partenariat à été réalisé avec ${userTopart}﹒ ﹕`)
.setFooter("Si le membre à quitté le serv, supprimer la pub de cette personne et mettez une réaction croix sur ce message. "); 


 const Mchannel = message.guild.channels.cache.get('914235577400967218');
 Mchannel.send(`${userTopart}`);       
 Mchannel.send({
					embeds: [logEmbed],
					ephemeral: true});




		const partEmbed = new Discord.MessageEmbed()
			.setColor("#f5af96")
			.setTitle("﹒൭˚ Un Nouveau Partenariat!")
			.setAuthor("╰ ╴▸   .˚ ⤹ ❝ mais que vois-je? ︶꒷꒦", message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				/*	"**・↓<a:A_ValideRose:902448325733781524>↓₍ᐢᐢ₎ ꒰ nous avons un nouveau partenaire de confiance! ♡ ꒱ ᓚꕤꕤ﹕๑₊˚**\n"
        +"**‧˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚‧**\n"
        +`**╭₊꒷︶ଓ  <a:A_InterrogationPink:902491970713300992> ✦✦ ﹕partenariat réalisé avec ${userTopart} **\n`
        +"**┊ᓚ𖦹 ୨<a:A_maryetmudae:902449424771457024> ୧₊˚𓂃 mention: partenariat **\n"
        +`**┊₊˚ꕤꕤ﹕⌗<a:A_CatHeart:901163577250021428> ﹒ ﹕ ̟乀 partenariat géré par: ${message.author.username}**\n`
        +`**╰ ୨<a:A_Multi_stars:902276277124354128>﹕๑‧₊˚┈ ᘏᘏ petit message: ${partReason.length < 1 ? "Merci de vous être associé.e à nous!" : partReason}**\n`
				
				"**╭ ꒷꒦ ‧₊˚<a:A_InterrogationPink:902491970713300992> ↓₍ᐢᐢ₎ ꒰ nous avons un nouveau partenaire de confiance! ♡ ꒱ ᓚꕤꕤ﹕๑₊˚**\n"
				+ "**┊  ꒱꒱﹕**\n"
				+ "**╰╮˚꒷˖꒦︶꒷ ♡︶˚꒥₊**\n"
				+ `** ・<a:A_CatHeart:901163577250021428>・↷ Merci à· ${userTopart}˚ ༘**\n`
				+ `** ・<a:A_maryetmudae:902449424771457024>↷ Partenariat géré par ${message.author.username} ·˚ ༘**\n`
				+ "** ・<a:A_Multi_stars:902276277124354128>・↷  Ping a voir après test**\n"
        + `** ୨<:B_NezukoCute:901469985300439040>୧  ̊  ̟ ๑ ︵︵  ${partReason.length < 1 ? "Merci de vous être associé.e à nous!" : partReason} ·˚ ༘**\n`
				+ "**╰ ๑₊˚ʚ<a:A_ValideRose:902448325733781524>ɞ︶꒦꒷₊˚**"
        */
      `**\ 🌸◞ ꒷꒦﹕**Oh! Merci gentil(le) personne! ** ! ₊˚ᗢ**\n`
      + `**・‿︵‿︵‿︵๑‧˚₊꒷︶꒦꒷︶**\n`
      + `**‧₊꒷ ʚ\ 🍼❜﹕*Partenariat réalisé avec ${userTopart} * ! ꒷₊˚**\n`
      + `**⌗・Mention : Ping a voir après test** ꒰\ 🌊꒷꒦**\n`
      + `**꒷꒦ __Géré par : ${message.author.username} __! ⸝⸝ ‧˚.**\n`
      + `**‧₊꒷ ʚ\ 🦋❜﹕Merci de t'être associé.e à nous ! ꒷₊˚**\n`
      + `╰ ๑ ‧ ₊˚ ︶꒷꒦︶︶꒷︶꒷꒦ ⊹ ₊˚ <a:A_LuneKiBrille:901163601711226952> `

			)
			.setFooter("Tu veux faire un partenariat avec nous? Va dans le salon ticket et cherche ceux pour les partenariats.");

		// message.channel.send("<@&897416241784954912>")
		message.channel.send({
			embeds: [partEmbed],
			ephemeral: true
		});
	}
};
