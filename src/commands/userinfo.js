const { MessageEmbed } = require("discord.js");
const getUserDb = require("../utils/getUser");
const logger = require("../utils/logger");

module.exports = {
	data: {
		name: "userinfo",
		description: "Affiche des informations sur un utilisateur.",
		category: "Informations"
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @param {string[]} args 
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

		// Récupération des permissions.
		const permissions = member.permissions.toArray().map(perm => {
			return perm
				.toLowerCase()
				.replace(/_/g, " ") // Replace all underscores with spaces
				.replace(/\w\S*/g, txt => {
					// Capitalize the first letter of each word
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});
		});

		// Calculate Join Position
		let joinPosition = 0;
		const guildMembers = await message.guild.members.fetch()
		const sortedMembers = guildMembers.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp).toJSON();
		for (let i = 0; i < sortedMembers.length; i++) {
			console.log(i, sortedMembers[i])
			if (sortedMembers[i].user.id == member.user.id) {
				joinPosition = i;
			}
		}

		const userInDb = getUserDb(message.author.id);
		const joinDate = new Date(member.joinedAt);

		// Construction de la réponse.
		const embed = new MessageEmbed()
			.setColor(member.displayHexColor) 
			.setTitle(member.user.tag)
			.setDescription(`Informations sur l'utilisateur ${member.displayName} (${member.user.tag})`)
			.setThumbnail(member.user.avatarURL())
			.addFields(
				{
					name: "À rejoint le",
					value: joinDate.toLocaleString("fr-FR"),
					inline: true
				},
				{
					name: "En position",
					value: `N. ${joinPosition}` ,
					inline: true
				},
				{ name: "\u200B", value: "\u200B" },
				{
					name: "Premium",
					value: `${userInDb.premium ? "Oui" : "Non"}`,
					inline: true
				},
				{
					name: "Bak-warns",
					value: "*indispo pour le moment*",
					inline: true
				},
				{
					name: "Bak-ban",
					value: `${userInDb.bakbanned ? "Oui" : "Non"}`,
					inline: true
				},
				{ name: "\u200B", value: "\u200B" },
				{
					name: "Permissions",
					value: permissions.join(", ")
				}
			)
			.setTimestamp()
			.setFooter(`*userinfo de ${member.user.tag}`, member.user.avatarURL());

		await message.channel.send({
			embeds: [embed]
		});
	}
};
