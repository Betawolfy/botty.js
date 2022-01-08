/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Commande pour pleurer.",
	async execute (message, args) {
		const responses = [
			"https://i.kym-cdn.com/photos/images/original/001/890/995/e1c.gif",
			"https://www.icegif.com/wp-content/uploads/among-us-kill-icegif.gif",
		];

		const userMentionInArgs = args.shift();
		if (!userMentionInArgs) {
			return await message.reply({
				content: "Utilisateur introuvable !"
			});
		}

		const userTokill = 
			message.guild.members.cache.find(member => member.user == message.mentions.users.first())
			|| message.guild.members.get(userMentionInArgs);

		const response = responses[Math.floor(Math.random() * responses.length)];
		const preResponse = `${message.author.username} à tué ${userTokill}`;

		await message.channel.send({
			content: `${preResponse} ${response}`
		});
	}
};