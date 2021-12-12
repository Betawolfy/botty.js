/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Permet de dévérouiller le salon sélectionné.",
	async execute(message) {
		if (!message.member.permissions.has("MANAGE_CHANNELS")) {
			return await message.reply({
				content: "Vous ne pouvez pas utiliser cette commande !"
			});
		}

		await message.channel.permissionOverwrites.edit(
			message.channel.guild.roles.everyone,
			{
				VIEW_CHANNEL: true,
				SEND_MESSAGES: true
			}
		);

		await message.channel.send(`Le salon **${message.channel.name}** à été débloqué avec succès.`);
	}
};
