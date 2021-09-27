const logger = require("./utils/logger");
const Discord = require("discord.js");
const connectDatabase = require("./utils/connectDatabase");
const express = require("express");
const router = require("./routes");
const path = require("path");

// Chargement des variables d'environnements.
require("dotenv").config();

// Connexion à la base de données.
connectDatabase();

// Création du serveur web.
const app = express();

// On crée le sharding du bot.
logger.log("info", "Le bot est en cours de démarrage...");
const clientPath = path.join(__dirname, "client", "index.js");
const shardingManager = new Discord.ShardingManager(clientPath, {
	token: process.env.DISCORD_TOKEN
});

// On démarre le sharding manager.
shardingManager.on("shardCreate", shard => logger.log("info", `Le shard ${shard.id} à démarré avec succès !`));
shardingManager.spawn();

// On ajoute le manager à l'API web.
app.use((req, _res, next) => {
	req.discord = shardingManager;
	next();
});

// On ajoute le routeur du serveur web.
app.use(router);

// On démarre le serveur web.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	logger.log("info", `Le serveur web est en ligne sur le port ${PORT} !`);
});
