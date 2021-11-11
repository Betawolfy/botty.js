const msgLogger = require("../utils/msgLogger");
const logger = require("../utils/logger");

module.exports = {
	name: "messageCreate",
	
	/**
	 * @param {import("discord.js").Message} message 
	 * @returns {Promise<void>}
	 */
	async execute (message) {
		try {
		  // On vérifie que le message n'est pas d'un bot.
			if (message.author.bot) return;

			// On garde le message dans les logs de Botty.
			const messageInGuild = message.guild ? true : false;
			msgLogger.info(`[${messageInGuild ? "GUILD] [" + message.guild.name : "DM"}] [${message.channel.name}] [${message.author.tag}]: ${message.content}`);

			// Rien si le message est un DM.
			if (!message.guild) return;

			/** Version MongoDB
		 * On récupère des infos sur l'utilisateur depuis la BDD.
		 * S'il existe pas encore, on le crée.
		 
			const user = await User.findOne({ // On cherche l'utilisateur dans la BDD.
				id: message.author.id
			}) || await User.create({ // On crée l'utilisateur s'il n'existe pas.
				id: message.author.id,
				servers: [{ id: message.guild.id }]
			});
     */

			// On récupère les données de cette utilisateur
			// sur le serveur où le message est envoyé.
			// const userInServer = user.servers.find(server => server.id === message.guild.id);

			// On définit le préfix.
			const prefix = "*";

			// On check si le message contient le prefix.
			if (message.content.startsWith(prefix)) {
			  // On récupère les arguments et le nom de la commande.
				const args = message.content.slice(prefix.length).trim().split(/ +/);
				const commandName = args.shift().toLowerCase();
	
				// Vérification si la commande existe.
				if (!message.client.commands.has(commandName)) return;
	
				// On exécute la commande.
				logger.info(`[${message.guild.id}] La commande ${commandName} a bien été executé par ${message.author.id}`);
				await message.client.commands.get(commandName).execute(message, args);
			
			}
			// Si le message ne contient pas de prefix, on log son message
			// et on lui donne de l'XP.
			else {
      
				// On augmente son XP.
				
				// userInServer.level_system.xp++;
			
				// Si il dépasse 100 d'XP, on augmente le level.
				/*if (userInServer.level_system.xp >= 100) {
					userInServer.level_system.level++;
					userInServer.level_system.xp = 0;
				
					// On en informe l'utilisateur.
					message.channel.send({
						content: `Vous avez atteint le niveau ${userInServer.level_system.level} !`,
						ephemeral: true
					});
				}

				await User.findByIdAndUpdate(user._id, user);
			*/}

		}
		// Une erreur est survenue.
		catch (error) {
			logger.error(error);

			const random = Math.floor((Math.random() * 100) + 1);
			await message.reply({
				content: "Hmmm... Cette commande n'a pas l'air de fonctionner ! L'équipe technique à été prévenue et va essayer de régler ce problème au plus vite ! Numéro de l'erreur: " + random
			});
		}
	}
};
