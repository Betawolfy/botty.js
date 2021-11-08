const { Client, Intents, Collection } = require("discord.js");
const connectDatabase = require("../utils/connectDatabase");
const logger = require("../utils/logger");
const path = require("path");
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream('./msgs.txt'));

// Auto-exécution en asynchrone.
const client = new Client({
	// Intents préviligiés du bot.
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS
	],

	// Personalisation de la présence
	// => Écoute les commandes.
	presence: {
		activities: [{
			name: "V 0.9 -bêta",
			type: "LISTENING"
		}]
	}
});

	
// Une fois que le bot est connecté.
client.once("ready", async () => {
	logger.info(`${client.user.username} est en ligne sur ${client.guilds.cache.size} serveurs !`);

	await connectDatabase();
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

client.on('message', msg => {
    if(msg.author.bot) return;
      const currentDate = new Date();
      const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
      const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
      myConsole.log(`${currentDate}${guildTag}${channelTag} ${msg.author.tag}: ${msg.content}`);
});

// Connexion du bot.
client.login(process.env.DISCORD_TOKEN);