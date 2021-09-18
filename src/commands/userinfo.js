const { MessageEmbed } = require("discord.js");
const User = require("../models/User");

module.exports = {
	data: {
		name: "userinfo",
		description: "Affiche des informations sur un utilisateur.",
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

		// On récupère l'info de l'utilisateur dans la BDD.
		// On le crée s'il n'existe pas encore.
		const userInfoDb = await User.findOne({
			id: member.user.id
		}) || await User.create({
			id: member.user.id,
			servers: [{ id: message.guild.id }]
		});
		const userInfoDbInServer = userInfoDb.servers.find(server => server.id === message.guild.id);

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
		const guildMembers = message.guild.members.cache.sort((a, b) => a.joinedAt - b.joinedAt);
		for (let i = 0; i < guildMembers.length; i++) {
			if (guildMembers[i].id == member.user.id)
				joinPosition = i;
		}

		// Construction de la réponse.
		const embed = new MessageEmbed()
			.setColor(member.displayHexColor) 
			.setTitle(member.user.tag)
			.setDescription(`Informations sur l'utilisateur ${member.displayName} (${member.user.tag})`)
			.setThumbnail(member.user.avatarURL())
			.addFields(
				{
					name: "Niveau",
					value: `niveau ${userInfoDbInServer.level_system.level} et ${userInfoDbInServer.level_system.xp}/100 d'XP`,
					inline: true
				},
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
					name: "Bak-warns",
					value: `*indispo pour le moment*`,
					inline: true
				},
				{
					name: "Bak-ban ?",
					value: "0 Bak ban enregistrés",
					inline: true
				},
				{ name: '\u200B', value: '\u200B' },
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