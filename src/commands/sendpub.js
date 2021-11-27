module.exports = {
	data: {
		name: "sendpub",
		description: "envoie les pub pour les partenariats",
		category: "₊˚દ Utilitaires"
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @param {string[]} args
	 * @returns {Promise<void>} 
	 */
	async execute(message, args) {
		let textToSay = args.join(" ");
		if (textToSay.length <= 0) {
			return await message.channel.send({
			content:":x: - veuillez coller votre pub."
		});
		}

		// On supprime le message original.
		await message.delete();

		// On envoie celui que dira le bot.
		await message.channel.send({
			content:"voici la pub demandé: \n" + textToSay
		});
	}
};
