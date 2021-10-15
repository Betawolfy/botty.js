const router = require("express").Router();
const apiRouter = require("./api");
const pkg = require("../../package.json"); 

// Ajout des routes pour l'API.
router.use("/api", apiRouter);

// GET /
router.get("/", (req, res) => {
	res.send(`Bienvenue sur le site de Botty ! Celui-ci est en cours de construction...\n version du bot: ${pkg.version} `);
});

module.exports = router;