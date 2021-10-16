module.exports = {
	data: {
		name: "dmleavepart",
		description: "Avertir un utilisateur.",
    category: "moderation",
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
				content: "Utilisateur non mentionné !"
			});
		}

		const userToWarn = await message.client.users.fetch(userMentionInArgs)
                  .catch(e => {
                    console.error(e);

                    return await message.reply("Utilisateur introuvable");
                  });
	
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
