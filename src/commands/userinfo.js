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
			member = message.guild.member(message.author);
		}

		// Si l'utilisateur est mentionné, on affiche ses infos.
		else {
			member = message.guild.member(message.mentions.users.first());

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
		let joinPosition;
		const members = message.guild.members.cache.array();
		members.sort((a, b) => a.joinedAt - b.joinedAt);
		for (let i = 0; i < members.length; i++) {
			if (members[i].id == message.guild.member(message.author).id)
				joinPosition = i;
		}

		// Construction de la réponse.
		const embed = {
			color: 3447003,
			title: `${member.user.tag}`,
			thumbnail: {
				url: member.user.avatarURL()
			},
			description: `${member.displayName}`,
			fields: [
				{
					name: "À rejoint le",
					value: `${member.joinedAt.toDateString()} à ${member.joinedAt.toTimeString()}`
				},
				{
					name: "Membre n.",
					value: joinPosition
				},
				{
					name: "Permissions",
					value: permissions.join(", ")
				},
			],
			timestamp: new Date(),
			footer: {
				text: `ID: ${member.id}`
			}
		};

		await message.channel.send({
			embeds: [embed]
		});
	}
};