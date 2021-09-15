module.exports = {
	data: {
		name: "help-utility",
		description: "Page d'aide sur les utilitaires."
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		message.channel.send({
			content: "_serverinfo : Permet de voir les informations du serveur.\n"
				+ "_optiwork: montre le niveau de sécurité de botty sur une échelle de critères. \n"
				+ "_ping: donne votre ping en ms.\n"
				+ "_serverlist : afficher la liste des serveurs qui font confiance à Botty.\n"
				+ "_userinfo {mention}: donne des info sur le membre mentionné.\n"
				+ "_finduser {ID}: vérifie si l ID est bien attaché à un membre de discord.\n"
				+ "_getserverinvite {id du serveur}: génère une invitation temporaire via l ID vers le serveur donné\n"
		});
	},
};
