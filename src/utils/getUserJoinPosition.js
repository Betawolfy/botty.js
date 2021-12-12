/**
 * Calcul la position à laquelle le membre à rejoint le serveur.
 * - 0 => Créateur du serveur.
 * @param {import("discord.js").Message} message 
 * @param {import("discord.js").GuildMember} member 
 */
module.exports = async (message, member) => {
	let joinPosition = 0;
	const guildMembers = await message.guild.members.fetch();
	const sortedMembers = guildMembers.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp).toJSON();
	for (let i = 0; i < sortedMembers.length; i++) {
		if (sortedMembers[i].user.id == member.user.id) {
			joinPosition = i;
		}
	}

	return joinPosition;
};