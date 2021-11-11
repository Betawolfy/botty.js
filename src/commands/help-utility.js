module.exports = {
	data: {
		name: "help-utility",
		description: "Page d'aide sur les utilitaires.",
		category: "help",
    
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		message.channel.send({
			content: "*serverinfo : Permet de voir les informations du serveur.\n"
				+ "(undispo) *optiwork: montre le niveau de sécurité de botty sur une échelle de critères. \n"
				+ "*ping: Donne le ping du bot.\n"
				+ "(undispo) *serverlist : afficher la liste des serveurs qui font confiance à Botty.\n"
				+ "*userinfo {mention}: Donne des infos sur le membre mentionné (permissions, niveaux, ...).\n"
				+ "(undispo) *finduser {ID}: vérifie si l'ID est bien attaché à un membre de discord.\n"
				+ "(undispo *getserverinvite {id du serveur}: génère une invitation temporaire via l ID vers le serveur donné\n"
		});
	},
};
