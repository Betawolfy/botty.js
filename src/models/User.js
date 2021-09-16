const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	// ID de l'utilisateur
	id: {
		type: String,
		required: true,
	},

	bakBanned: {
		type: Boolean,
		default: false
	},
	bakBannedReason: {
		type: String
	},

	// Les données de l'utilisateur sur chaque serveurs.
	servers: {
		type: [{

			// Les données sur le système de niveau.
			level_system: {
				xp: { // XP accumulée (se remet à 0 à chaque niveau)
					type: Number,
					required: true,
					default: 0
				},
				level: { // Niveau de l'utilisateur.
					type: Number,
					required: true,
					default: 0
				}
			},

			// Tous les warns accumulés sur le serveur.
			warns: {
				type: [{ // Sur chaque warns on a ...
					// La raison du warn. ("Inconnue" par défaut)
					reason: {
						type: String,
						default: "Inconnue"
					},
					author: { // L'auteur (ID) du warn.
						type: String,
						required: true
					}
				}],
				default: []
			}
		}],
		default: []
	}
});

module.exports = mongoose.model("User", userSchema);