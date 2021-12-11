/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Permet de vérouiller le salon sélectionné.", 
	async execute(message) {
		if (!message.member.permissions.has("MANAGE_CHANNELS")) {
			return await message.reply({
				content: "Vous ne pouvez pas utiliser cette commande !"
			});
		}
	
		await message.channel.permissionOverwrites.edit(
			message.channel.guild.roles.everyone,
			{
				VIEW_CHANNEL: false,
				SEND_MESSAGES: false
			}
		);

		await message.channel.send(`**‿̩͙‿̩̩̽‿̩͙‿̩̥̩‿̩̩̽‿̩͙‿̩͙‿̩̩̽‿̩͙‿̩͙‿̩̩̽‿̩͙‿̩̥̩‿̩̩̽‿̩͙‿̩͙‿̩̩̽‿̩͙‿̩̥̩‿̩̩̽‿̩͙ˊ** \n₊˚દ Le salon **${message.channel.name}** à été bloqué avec succès..✦`);
	}
};
