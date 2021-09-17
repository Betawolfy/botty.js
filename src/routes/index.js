const router = require("express").Router();
const apiRouter = require("./api");

// Ajout des routes pour l'API.
router.use("/api", apiRouter);

// GET /
router.get("/", (req, res) => {
	res.send("Bienvenue sur le site de Botty ! Celui-ci est en cours de construction...");
});

module.exports = router;