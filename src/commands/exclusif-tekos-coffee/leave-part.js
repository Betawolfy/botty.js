/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Avertir un utilisateur de la suppression de son partenariat.",
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
			/*`Vous avez reçu un avertissement venant de la guilde **${message.guild.name}** par **${message.author.username}** !\n`
			+ `Raison du warn: **${warnReason.length <= 0 ? "Aucune raison donné" : warnReason}**`
      */
      "Bonjour!\n"
`Vous avez quitté notre serveur ${message.guild.name}, nous en sommes désolé si vous n'avez pas été satisfait. Toutefois, vous avez fait un partenariat avec nous. Nos conditions nous donne l'obligation de supprimer un partenariat si son partenaire quitte notre serveur. Votre partenariat avec nous à donc été annulé et votre pub supprimé de notre salon.`
+ `Sachez que vous pouvez toujours revenir et refaire un partenariat avec nous.\n`
+ `Bonne journée,\n`
+ `${message.author.username} du serveur teko coffee.`
		);

		// Information dans le serveur.
		await message.channel.send(`${userToWarn} a quitté et a donc été avertis: **${warnReason.length < 1 ? "Aucune note" : warnReason}**`);
	}
};
