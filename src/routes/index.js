const router = require("express").Router();
const controllers = require("./controllers");

/** Accueil de l'API.
 * @route {GET} /api
 */
router.get("/", controllers.homepage);

module.exports = router;
