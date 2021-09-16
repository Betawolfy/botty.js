module.exports = {
	data: {
		name: "help-staff",
		description: "Page d'aide pour le staff."
	},

	/**
	 * @param {import("discord.js").Message} message
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		message.channel.send({
			content: "*kick `@mention` `raison`: Expulse un membre du serveur. Celui-ci peut revenir à l’aide d’une invitation. \n"
				+ "(indispo) *bak-ban `@mention` `raison`: Expulse définitivement un membre des serveurs sécurisés par BAK à moins de se faire débannir manuellement, pour plus d'info, `_bak-help`.\n"
				+ "*warn `@mention` `raison` : avertir un membre du serveur. à partir de 3 warns, l'équipe sécurité de Botty débattra sur un possible bak-ban.\n"
				+ "*lock : Permet de vérouiller le salon sélectionné.\n"
				+ "*unlock : Permet de dévérouiller le salon sélectionné."
		});
	}
};
