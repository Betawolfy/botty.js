/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Expulser un membre.",	
	async execute(message) {
		const member = message.mentions.members.first();

		try {
			const kickedMember = await member.kick();
			await message.channel.send(`:wave: ${kickedMember.displayName} a été kick.`);
		}
		catch (e) {
			if (!message.member.permissions.has("KICK_MEMBERS") || !message.member.permissions.has("ADMINISTRATOR")) {
				await message.reply("Vous ne pouvez pas utiliser cette commande !");
			}
			else if (message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("ADMINISTRATOR")) {
				await message.reply({
					content: "Vous ne pouvez pas kick cet utilisateur."
				});
			}

		}
	}
};
