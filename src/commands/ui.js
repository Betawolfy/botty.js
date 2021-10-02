const logger = require("../utils/logger");

module.exports = {
	data: {
		name: "ui",
		description: "version plus simple de userinfo",
    category: "devloppement",
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message, args) {
		let member; // L'utilisateur à qui on veut afficher les infos

		// Si l'utilisateur n'est pas mentionné
		// on affiche les infos de l'auteur du message.
		if (!args.length) {
			member = await message.guild.members.fetch(message.author);
		}

		// Si l'utilisateur est mentionné, on affiche ses infos.
		else {
			member = await message.guild.members.fetch(message.mentions.users.first());

			// Afficher une erreur si on ne peut pas récupérer le membre.
			if (!member) {
				await message.reply(
					`:x: - Je n'ai pas pu retrouver de membre avec l'ID \`${args[0]}\``
				);
				return;
			}
		}
		let joinPosition = 0;
		const guildMembers = message.guild.members.cache.sort((a, b) => a.joinedAt - b.joinedAt);
		for (let i = 0; i < guildMembers.length; i++) {
			if (guildMembers[i].id == member.user.id)
				joinPosition = i;
		}
		const embed = new Discord.MessageEmbed()
			
      .setColor(member.displayHexColor) 
			.setTitle(member.user.tag)
			.setDescription(`Informations sur l'utilisateur ${member.displayName} (${member.user.tag})`)
			.setThumbnail(member.user.avatarURL())
			.addFields(
				{
					name: "À rejoint le",
					value: `${member.joinedAt.toDateString()} à ${member.joinedAt.toTimeString()}`,
					inline: true
				},
				{
					name: "En position",
					value: `N. ${joinPosition}` ,
					inline: true
				},
				{ name: '\u200B', value: '\u200B' },
				{
					name: "Bak-ban ?",
					value: `${userInfoDbInServer.id.bakbanned}`,
					inline: true
				},
			)
			.setTimestamp()
			.setFooter(`*userinfo de ${member.user.tag}`, member.user.avatarURL());

		await message.channel.send({
			embeds: [embed]
		});
	}
}