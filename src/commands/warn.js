module.exports = {
	data: {
		name: "warn",
		description: "Avertir un utilisateur.",
		category: "Modération"
	},

	/**
	 * @param {import("discord.js").Message} message - Données du message.
	 * @param {string[]} args - Arguments du message, ici la raison du warn.
	 * @returns {Promise<void>}
	 */
	async execute(message, args) {
		if (!message.member.permissions.has("ADMINISTRATOR")) {
			return await message.reply({
				content: "Vous ne pouvez pas utiliser cette commande !"
			});
		}

		// Utilisateur à warn.
		const userMentionInArgs = args.shift();
		if (!userMentionInArgs) {
			return await message.reply({
				content: "Utilisateur introuvable !"
			});
		}

		const userToWarn = 
			message.guild.members.cache.find(member => member.user == message.mentions.users.first())
			|| message.guild.members.get(userMentionInArgs);

		// Raison du warn
		const warnReason = args.join(" ");

		// Envoie du message à l'utilisateur.
		await userToWarn.send(
			`Vous avez reçu un avertissement venant de la guilde **${message.guild.name}** par **${message.author.username}** !\n`
			+ `Raison du warn: **${warnReason.length <= 0 ? "Aucune raison donné" : warnReason}**`
		);

		// Information dans le serveur.
		await message.channel.send(`${userToWarn} a été warn pour la raison: **${warnReason.length < 1 ? "Inconnue" : warnReason}**`);
	}
};
