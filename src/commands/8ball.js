module.exports = {
	data: {
		name: "8ball",
		description: "Démarre un jeu de 8ball.",
		category: "Fun"
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
			"n'y compte pas.",
			"repose moi la question plus clairement.",
		];

		message.channel.send({
			content: ":8ball: " + responses[Math.floor(Math.random() * responses.length)]
		});
	}
};
