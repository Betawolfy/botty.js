const Discord = require("discord.js");
const pkg = require("../../package.json");
const logger = require("../utils/logger");

module.exports = {
	data: {
		name: "help",
		description: "Page d'aide",
		category: "₊˚દ Utilitaires"
	},

	/**
	 * @param {import("discord.js").Message} message 
	 * @returns {Promise<void>}
	 */
	async execute(message) {
		const helpEmbed = new Discord.MessageEmbed()
			.setColor("c36666")
			.setTitle("꒷꒦︶︶ Page d'aide globale ✦ . *")
			.setURL("https://botty.ga/")
      .setImage("https://www.icegif.com/wp-content/uploads/aesthetic-icegif-11.gif")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				"**﹒ ﹕ ̟乀 Sélectionnez une catégorie ci-dessous. .✦**"
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

		const commandsData = message.client.commands.map(command => command.data);
		const categoriesRaw = commandsData.map(command => command.category);
		const categoriesSorted = [...new Set(categoriesRaw)];
		const selectOptions = categoriesSorted.map(category =>
			({
				label: category,
				description: `₊˚ ୨ Affiche les commandes de la catégorie ${category} ・— ๑`,
				value: `help-${category}`
			})
		);

		const menu = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId(`menu-help-${message.id}`)
					.setPlaceholder("₊˚દ Rien est selectionné ✦ . *")
					.addOptions(selectOptions)
			);

		try {
			// On vérifie si l'ID du message est le même,
			// et si l'utilisateur est le mëme.
			const filter = i => {
				return (i.customId.replace("menu-help-", "") === message.id)
          && (i.user.id === message.author.id);
			};

			// On récupère la sélection (30s d'AFK max.)
			const collector = message.channel.createMessageComponentCollector({ filter, idle: 30 * 1000 });

			collector.on("collect", async (collected) => {
				const value = collected.values[0].replace("help-", "");
				const matchingCommands = commandsData.filter(command => command.category === value);

				const newEmbed = new Discord.MessageEmbed()
					.setTitle(value)
					.setDescription(
						matchingCommands.map(command => `*${command.name} - ${command.description}`).join("\n")
					);

				await collected.update({
					embeds: [newEmbed]
				});
			});

			message.channel.send({
				embeds: [helpEmbed],
				components: [menu]
			});
		}
		catch (e) {
			logger.error(e);
		}
	}
};
