/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Envoie les pubs pour les partenariats.",
	async execute(message, args) {
		let textToSay = args.join(" ");
		if (textToSay.length <= 0) {
			return await message.channel.send({
				content:":x: - Syntaxe incorrecte! Essayez `*sendpub <votre pub>`"
			});
		}

		// On supprime le message original.
		await message.delete();

		// On envoie celui que dira le bot.
		await message.channel.send({
			content:"Voici la pub demandé: \n" + textToSay
		});
	}
};
