/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Démarre un jeu de 8ball.",
	async execute (message) {
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

		const response = responses[Math.floor(Math.random() * responses.length)];
		const preResponse = "**ʚ . ⋆ ₊** :8ball: **・— ๑ ˖ **\n ╰﹕୭ ₊˚  ︰";

		await message.channel.send({
			content: `${preResponse} ${response}`
		});
	}
};
