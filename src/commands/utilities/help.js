const pkg = require("../../../package.json");
const logger = require("../../utils/logger");
const Discord = require("discord.js");

/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Page d'aide globale.",
	async execute (message) {
		const helpEmbed = new Discord.MessageEmbed()
			.setColor("#c36666")
			.setTitle("꒷꒦︶︶ Page d'aide globale ✦ . *")
			.setURL("https://botty.ga/")
			.setImage("https://www.icegif.com/wp-content/uploads/aesthetic-icegif-11.gif")
			.setAuthor(`Botty.js v${pkg.version}`, message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				"**﹒ ﹕ ̟乀 Sélectionnez une catégorie ci-dessous. .✦**\n"
				+ "**₊˚ ୨ note: vous devez avoir la vernière version de discord pour pouvoir sélectionner.** "
			)
			.setFooter("Le bot étant encore en développement, certaines fonctionnalités sont susceptibles de ne pas être encore disponible.");

		const selectOptions = message.client.categories.map((category, categoryName) =>	({
			label: category.details.categoryName,
			description: `₊˚ ୨ ${category.details.categoryDescription} ・— ๑`,
			value: `help-${categoryName}`
		}));

		const menu = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId(`menu-help-${message.id}`)
					.setPlaceholder("₊˚દ Rien est selectionné ✦ . *")
					.addOptions(selectOptions)
			);

		try {
			// On vérifie si l'ID du message est le même,
			// et si l'utilisateur est le même.
			const filter = i => {
				return (i.customId.replace("menu-help-", "") === message.id)
          && (i.user.id === message.author.id);
			};

			// On récupère la sélection (30s d'AFK max.)
			const collector = message.channel.createMessageComponentCollector({
				filter,
				idle: 30 * 1000 // 30s.
			});

			collector.on("collect", async (collected) => {
				const value = collected.values[0].replace("help-", "");
				const matchingCommands = message.client.commands.filter(command => command.category === value);

				const newEmbed = new Discord.MessageEmbed()
					.setTitle(message.client.categories.get(value).details.categoryName)
					.setDescription(
						matchingCommands.map(
							(command, commandName) => `**\\*${commandName}** - ${command.commandDescription}`
						).join("\n")
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
