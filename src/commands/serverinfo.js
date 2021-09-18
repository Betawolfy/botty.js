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

			// Récupération des données du serveur.
			const currentGuild = await message.client.guilds.fetch(message.guild.id);
			const channelsCount = currentGuild.channels.cache.size;
			
			// Récupération des membres du serveur.
			const currentGuildMembers = await currentGuild.members.fetch();
			const membersCount = currentGuildMembers.filter(member => !member.user.bot).size;
			const botsCount = currentGuildMembers.filter(member => member.user.bot).size;

			// Récupération des administrateurs du serveur.
			currentGuildMembers.each(
				/** @param {Discord.GuildMember} member */
				member => {
					if (member.permissions.has("ADMINISTRATOR")) {
						admins.push(member.displayName);
					}
				}
			);

			const embed = new Discord.MessageEmbed()
				.setTitle(message.guild.name)
				.setDescription("Informations sur ce serveur.")
				.setThumbnail(message.guild.iconURL())
				.addFields(
					{
						name: "Administrateurs",
						value: admins.join(", ")
					},
					{
						name: "Date de création",
						value: `${message.guild.createdAt.toDateString()} à ${message.guild.createdAt.toTimeString()}`
					},
					{
						name: "Salons",
						value: String(channelsCount ?? 0),
						inline: true
					},
					{
						name: "Membres",
						value: String(membersCount ?? 0),
						inline: true
					},
					{
						name: "Bots",
						value: String(botsCount ?? 0),
						inline: true
					}
				)
				.setTimestamp()
				.setFooter(`ID: ${message.guild.id}`); 

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