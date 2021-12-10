const Discord = require("discord.js");

const getUserJoinPosition = require("../utils/getUserJoinPosition");

module.exports = {
	data: {
		name: "ui",
		description: "Version plus simple de userinfo",
		category: "₊˚દ Développement"
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

		const userJoinPosition = await getUserJoinPosition(message, member);

		const embed = new Discord.MessageEmbed()
			.setColor(member.displayHexColor) 
			.setTitle(member.user.tag)
			.setDescription(`Informations locales sur l'utilisateur ${member.displayName} (${member.user.tag})`)
			.setThumbnail(member.user.avatarURL())
			.addFields(
				{
					name: "à rejoint le serveur le:",
					value: new Date(member.joinedAt).toLocaleString("fr-FR"),
					inline: true
				},
				{
					name: "Compte crée le: ",
					value: new Date(member.user.createdAt).toLocaleString("fr-FR")
				},
				{
					name: "En position",
					value: `N. ${userJoinPosition}`,
					inline: true
				}
			)
			.setTimestamp()
			.setFooter(`*ui de ${member.user.tag}`, member.user.avatarURL());

		await message.channel.send({
			embeds: [embed]
		});
	}
};
