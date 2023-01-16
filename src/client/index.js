const { Client, Intents, Collection } = require("discord.js");
const database = require("../utils/connectDatabase");
const logger = require("../utils/logger");
const pkg = require("../../package.json");
const path = require("path");
const fs = require("fs");

const client = new Client({
	// Intents préviligiés du bot.
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	],

	// Personalisation de la présence
	presence: {
		activities: [{
			name: `MAINTENENCE`,
			type: "LISTENING"
		}]
	}
});

// Une fois que le bot est connecté.
client.once("ready", async () => {
	logger.info(`${client.user.username} est en ligne sur ${client.guilds.cache.size} serveurs !`);
	await database.connect();
});
	
// Ajout des events
const eventsFolder = path.join(__dirname, "../events");
const eventFiles = fs.readdirSync(eventsFolder).filter(file => file.endsWith(".js"));

// On ajoute chaque events du dossier `events`.
for (const file of eventFiles) {
	const event = require(`${eventsFolder}/${file}`);
	client.on(event.name, event.execute);

	logger.debug(`L'event ${event.name} a bien été chargée !`);
}

// On crée une collection de commandes à partir du dossier `commands`.
client.commands = new Collection();

// On crée une collection de catégories pour les commandes.
client.categories = new Collection();

const commandsFolder = path.join(__dirname, "../commands");
const categories = fs.readdirSync(commandsFolder);

// On ajoute chaque commandes à la collection.
for (const category of categories) {
	console.log(category);
	const categoryFolderContent = fs.readdirSync(path.join(commandsFolder, category));
	const commandFiles = categoryFolderContent.filter(file => file.endsWith(".js"));
	const details = require(`${commandsFolder}/${category}/details.json`);
	const commandsName = [];
	
	for (const commandFile of commandFiles) {
		const commandName = commandFile.replace(".js", "");
		/** @type {import("../types/command")} */
		const command = require(`${commandsFolder}/${category}/${commandFile}`);
		
		// On ajoute la commande à la catégorie.
		commandsName.push(commandName);
		
		// On ajoute la catégorie a la collection.
		client.commands.set(commandName, {
			category,
			...command
		});

		logger.log("info", `La commande ${commandName} a bien été chargée !`);
	}
	
	// On définit toutes les commandes dans cette catégorie.
	client.categories.set(category, {
		details,
		commandsName
	});
	logger.log("info", `La catégorie ${category} a bien été chargée !`);
}

// Debug et logs émis par Discord.
client.on("debug", (msg) => logger.log("debug", msg));
client.on("warn", (msg) => logger.log("warn", msg));
client.on("error", (msg) => logger.log("error", msg));

// Connexion du bot.
client.login(process.env.DISCORD_TOKEN);