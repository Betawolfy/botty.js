module.exports = {
	data: {
		name: "8ball",
		description: "Démarre un jeu de 8ball.",
		category: "₊˚દ Fun"
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		// Les difféntes réponses.
		const responses = [
			"Absolument !",
			"Absolument pas.",
			"C'est impossible",
			"Impossible.",
			"Bien sûr.",
			"Je ne pense pas.",
			"C'est vrai.",
			"C'est pas vrai.",
			"Je doute de ça.",
			"Je n'en doute pas.",
			"N'y compte pas.",
			"Repose moi la question plus clairement.",
		];

		message.channel.send({
			content: "**ʚ . ⋆ ₊** :8ball: **・— ๑ ˖ **\n ╰﹕୭ ₊˚  ︰" + responses[Math.floor(Math.random() * responses.length)]
		});
	}
};
