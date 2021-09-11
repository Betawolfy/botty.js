const { Collection } = require("discord.js");
const logger = require("../utils/logger");
const path = require("path");
const fs = require("fs");

class BottyEvents {
	constructor (commands) {
		this.commands = commands;
	}

	/**
   * Fonction qui permet de charger les commandes
   * et événements pour les utiliser plus tard.
   */
	static async load () {
		const commands = new Collection();

		const commandsFolder = path.join(__dirname, "../commands");
		const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith(".js"));

		// On ajoute chaque commandes à la collection.
		for (const file of commandFiles) {
			const command = require(`${commandsFolder}/${file}`);
			commands.set(command.data.name, command);

			logger.log("info", `La commande ${command.data.name} a bien été chargée !`);
		}

		// Création de la classe avec les commandes préchargés.
		return new BottyEvents(commands);
	}

	/**
   * Lorsqu'un message est crée, on recupère le nom de commande
   * avec les arguments, puis on exécute la commande.
   */
	async messageCreate (message) {

		console.log(message);
	}
}

module.exports = BottyEvents;
