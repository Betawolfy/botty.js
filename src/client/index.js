// Désactivation de Mongo.
// const connectDatabase = require("../utils/connectDatabase");

const { Client, Intents, Collection } = require("discord.js");
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
		Intents.FLAGS.GUILD_MEMBERS
	],

	// Personalisation de la présence
	presence: {
		activities: [{
			name: `v${pkg.version} | *help`,
			type: "LISTENING"
		}]
	}
});

	
// Une fois que le bot est connecté.
client.once("ready", async () => {
	logger.info(`${client.user.username} est en ligne sur ${client.guilds.cache.size} serveurs !`);

	// On désactive temporairement Mongo.
	// await connectDatabase();
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

const commandsFolder = path.join(__dirname, "../commands");
const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith(".js"));

// On ajoute chaque commandes à la collection.
for (const file of commandFiles) {
	const command = require(`${commandsFolder}/${file}`);
	client.commands.set(command.data.name, command);

	logger.debug(`La commande ${command.data.name} a bien été chargée !`);
}

// Debug et logs émis par Discord.
client.on("debug", (msg) => logger.debug(msg));
client.on("warn", (msg) => logger.warn(msg));
client.on("error", (msg) => logger.error(msg));

// Connexion du bot.
client.login(process.env.DISCORD_TOKEN);
