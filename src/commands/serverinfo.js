const Discord = require("discord.js");

module.exports = {
	data: {
		name: "serverinfo",
		description: "Affiche des informations sur le serveur actuel."
	},

	/**
	 * @param {Discord.Message} message 
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		if (message.guild) {
			/** @type {Discord.GuildMember[]} */
			let admins = [];

			// Récupération des administrateurs du serveur.
			message.guild.members.cache.array().forEach(
				/** @param {Discord.GuildMember} member */
				member => {
					if (member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
						admins.push(member.displayName);
					}
				}
			);

			const embed = {
				color: 3447003,
				title: message.guild.name,
				thumbnail: {
					url: message.guild.iconURL()
				},
				fields: [
					{
						name: "Administrateurs",
						value: admins.join(", ")
					},
					{
						name: "Date de création",
						value: `${message.guild.createdAt.toDateString()} at ${message.guild.createdAt.toTimeString()}`
					},
					{
						name: "Nombre de salons",
						value: message.guild.channels.cache.size
					},
					{
						name: "Nombre de membres",
						value: message.guild.members.cache.filter(member => !member.user.bot)
							.size
					},
					{
						name: "Nombre de bots",
						value: message.guild.members.cache.filter(member => member.user.bot)
							.size
					}
				],
				timestamp: new Date(),
				footer: {
					text: `ID: ${message.guild.id}`
				}
			};

			await message.channel.send({
				embeds: [embed]
			});
		}

		// Message envoyé en DM, impossible de récupérer infos du serveur.
		else {
			return message.reply(
				":warning: - Tu dois envoyer cette commande depuis un serveur qui possède ce bot."
			);
		}
	}
};