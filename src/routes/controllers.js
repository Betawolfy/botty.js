/** Accueil de l'API.
 * @param {import("../types/express").CustomRequest} req
 * @param {import("express").Response} res
 * @route {GET} /api
 */
exports.homepage = async (req, res) => {
	const sharding = req.discord;

	// Récupérer le nombre total de membres sur tout les serveurs de chaque shards du bot.
	const membersOnEachShards = await sharding.broadcastEval((client) => {
		return client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);
	});

	// On récupère le nombre total de membres sur tous les shards.
	const members = membersOnEachShards.reduce((total, shardTotalMembers) => total + shardTotalMembers, 0);

	const guildsOnEachShards = await sharding.broadcastEval((client) => client.guilds.cache.size);
	const guilds = guildsOnEachShards.reduce((total, shardGuilds) => total + shardGuilds, 0);

	res.json({
		success: true,
		data: {
			message: "Bienvenue sur l'API !",
			members,
			guilds
		}
	});
};
