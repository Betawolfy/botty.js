const { MessageEmbed } = require("discord.js");

const getUserJoinPosition = require("../utils/getUserJoinPosition");
const getUser = require("../utils/getUser");

module.exports = {
	data: {
		name: "userinfo",
		description: "Affiche des informations sur un utilisateur.",
		category: "₊˚દ Informations"
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
					`:x: ꒷ Je n'ai pas pu retrouver de membre avec l'ID \`${args[0]}\`.✦`
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

		const userJoinPosition = await getUserJoinPosition(message, member);
		const userInDb = await getUser(message.author.id);
		const joinDate = new Date(member.joinedAt);

		// Construction de la réponse.
		const embed = new MessageEmbed()
			.setColor(member.displayHexColor) 
			.setTitle(member.user.tag)
			.setAuthor("‿̩͙‿̩̩̽‿̩͙‿̩̥̩‿̩̩̽‿̩͙‿̩͙‿̩̩̽‿̩͙‿̩͙‿̩̩̽‿̩͙‿̩̥̩‿̩̩̽‿̩͙‿̩͙‿̩̩̽‿̩͙‿̩̥̩‿̩̩̽‿̩͙ˊ")
			.setDescription(`**﹒ ﹕ ̟乀 Informations sur l'utilisateur ${member.displayName} (${member.user.tag}).꒷.✦ **`)
			.setThumbnail(member.user.avatarURL())
			.addFields(
				{
					name: "₊˚દ À rejoint le ┊ ⋆ 。 ",
					value: joinDate.toLocaleString("fr-FR"),
					inline: true
				},
				{
					name: "₊˚દ En position ┊ ⋆ 。 ",
					value: `N. ${userJoinPosition}` ,
					inline: true
				},
				{ name: "\u200B", value: "\u200B" },
				{
					name: "₊˚દ Premium ┊ ⋆ 。 ",
					value: `${userInDb.isPremium ? "Oui" : "Non"}`,
					inline: true
				},
				{
					name: "₊˚દ Bak-warns ┊ ⋆ 。 ",
					value: "*Indisponible pour le moment.*",
					inline: true
				},
				{
					name: "₊˚દ Bak-ban ┊ ⋆ 。 ",
					value: `${userInDb.bakBanned ? "Oui" : "Non"}`,
					inline: true
				},
				{ name: "\u200B", value: "\u200B" },
				{
					name: "₊˚દ Permissions ┊ ⋆ 。 ",
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
