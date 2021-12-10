const mongoose = require("mongoose");

// Les données des warns de l'utilisateur sur un serveur.
const userGuildWarnSchema = new mongoose.Schema({
	// La raison du warn. ("Inconnue" par défaut)
	reason: {
		type: String,
		default: "Inconnue"
	},
	author: { // L'auteur (ID) du warn.
		type: String,
		required: true
	}
});


// Les données de l'utilisateur sur chaques serveurs.
const userGuildSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	
	// Les niveaux.
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

	// Les warns accumulés.
	warns: [userGuildWarnSchema]
});

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

	isPremium: {
		type: Boolean,
		default: false
	},

	// Les données de l'utilisateur sur chaque serveurs.
	guilds: [userGuildSchema]
});

module.exports = mongoose.model("User", userSchema);