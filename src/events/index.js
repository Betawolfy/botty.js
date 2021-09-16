const Discord = require("discord.js");
const logger = require("../utils/logger");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");

class BottyEvents {
	constructor(commands) {
		this.commands = commands;
	}

	/**
	 * Fonction qui permet de charger les commandes
	 * et événements pour les utiliser plus tard.
	 */
	static async load() {
		const commands = new Discord.Collection();

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
	 * 
	 * @param {Discord.Message} message
	 */
	async messageCreate(message) {
		// On vérifie que le message n'est pas faite pas un bot.
		if (message.author.bot) return;

		/**
		 * On récupère des infos sur l'utilisateur depuis la BDD.
		 * S'il existe pas encore, on le crée.
		 */
		const user = await User.findOne({ // On cherche l'utilisateur dans la BDD.
			id: message.author.id
		}) || await User.create({ // On crée l'utilisateur s'il n'existe pas.
			id: message.author.id,
			servers: [message.guild.id]
		});

		const userInServer = user.servers[message.guild.id];

		// On augmente son XP.
		userInServer.level_system.xp++;

		// Si il dépasse 100 d'XP, on augmente le level.
		if (userInServer.level_system.xp >= 100) {
			userInServer.level_system.level++;
			userInServer.level_system.xp = 0;

			// On en informe l'utilisateur.
			message.channel.send({
				content: `Vous avez atteint le niveau ${userInServer.level_system.level} !`,
				ephemeral: true
			});
		}

		// On check si le message contient notre prefix.
		const prefix = "*";
		if (!message.content.startsWith(prefix)) return;

		// On récupère les arguments et le nom de la commande.
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();

		// Vérification si la commande existe.
		if (this.commands.has(command)) return;

		// On exécute la commande.
		try {
			await this.commands.get(command).execute(message, args);
		}
		// Une erreur est survenue.
		catch (error) {
			logger.error(error);

			message.reply({
				content: "Hmmm... Cette commande n'a pas l'air de fonctionner ! L'équipe technique à été prévenu et va essayer de regler ce problème au plus vite !"
			});
		}
	}
}

module.exports = BottyEvents;
