module.exports = {
	data: {
		name: "say",
		description: "Faire dire au bot ce que tu veux.",
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @param {string[]} args
	 * @returns {Promise<void>} 
	 */
	async execute(message, args) {
		let textToSay = args.join(" ");
		if (textToSay.length <= 0) return;

		await message.channel.send({
			content: textToSay
		});
	}
};