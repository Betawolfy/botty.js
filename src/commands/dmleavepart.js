module.exports = {
	data: {
		name: "dmleavepart",
		description: "Avertir un utilisateur.",
    category: "moderation",
	},

	/**
	 * @param {import("discord.js").Message} message - Données du message.
	 * @param {string[]} args - Arguments du message, ici la raison du warn.
	 * @returns {Promise<void>}
	 */
	async execute(message, args) {
	
  const msgSended = await client.users.fetch(snowflakeID).send({
  content: "test"
});

console.log(msgSended) // <- l'objet message que t'as envoyé a l'utilisateur

		
}}