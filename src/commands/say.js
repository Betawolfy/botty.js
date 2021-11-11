module.exports = {
	data: {
		name: "say",
		description: "Faire dire au bot ce que tu veux.",
		category: "fun",
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @param {string[]} args
	 * @returns {Promise<void>} 
	 */
	async execute(message, args) {
		let textToSay = args.join(" ");
		if (textToSay.length <= 0) return;

		// On supprime le message original.
		await message.delete();

		// On envoie celui que dira le bot.
		await message.channel.send({
			content: textToSay
		});
	}
};