/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Faire dire au bot ce que tu veux.",
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
