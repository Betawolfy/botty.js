const database = require("./utils/connectDatabase");
const logger = require("./utils/logger");
const Discord = require("discord.js");
const express = require("express");
const router = require("./routes");
const path = require("path"); 

// Chargement des variables d'environnements.
require("dotenv").config();

// Connexion à la base de données.
database.connect();

// Création du serveur de l'API.
const app = express();

// On crée le sharding du bot.
logger.log("info", "Le bot est en cours de démarrage...");
const clientPath = path.join(__dirname, "client", "index.js");
const shardingManager = new Discord.ShardingManager(clientPath, {
	token: process.env.DISCORD_TOKEN
});

// On démarre le sharding manager.
shardingManager.on("shardCreate", shard => {
	logger.log("info", `Le shard ${shard.id} à démarré avec succès !`);
});

// On créé les shards.
shardingManager.spawn();

// On ajoute le manager à l'API.
app.use(
	/** @param {import("./types/express").CustomRequest} req */
	(req, _, next) => {
		req.discord = shardingManager;
		next();
	}
);

// On ajoute le routeur de l'API.
app.use("/api", router);

// Route pour UptimeRobot
app.get("/", (_, res) => {
	res.status(200).json({
		success: true
	});
});

// Custom 404.
app.all("*", (_, res) => {
	res.status(404).json({
		success: false
	});
});

// On démarre l'API.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	logger.log("info", `L'API est en ligne sur le port ${PORT} !`);
});
