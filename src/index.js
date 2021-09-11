const logger = require("./utils/logger");
const express = require("express");
const app = express();

// Chargement des variables d'environnements.
require("dotenv").config();

app.use((req, res) => {
  res.status(200).send("Botty est opérationnel !");
});

// On démarre le serveur web.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.log("info", `Le serveur web est en ligne sur le port ${PORT} !`);
  logger.log("info", "Le bot est en cours de démarrage...");

  // On charge le bot pour qu'il puisse démarrer.
  require("./client");
});

