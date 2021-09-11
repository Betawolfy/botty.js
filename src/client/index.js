const { Client, Intents} = require("discord.js");
const BottyEvents = require("../events");
const logger = require("../utils/logger");

// Auto-exécution en asynchrone.
(async () => {
  const Events = await BottyEvents.load();

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
        name: "les commandes.",
        type: "LISTENING"
      }]
    }
  });

  // Une fois que le bot est connecté.
  client.once("ready", async () => {
    console.info(`${client.user.username} est en ligne sur ${client.guilds.cache.size} serveurs !`);
  });

  // Lorsqu'un message est envoyé...
  client.on("messageCreate", Events.messageCreate);

  // Debug
  client.on("debug", console.info);
  client.on("warn", console.warn);
  client.on("error", console.error);

  // Connexion du bot.
  client.login(process.env.DISCORD_TOKEN);
})();
