const Client = require("@replit/database");
module.exports = async (id) => {
	const db = new Client();
	const key = `user-${id}`;
	
	try {
		const user = await db.get(key);

		return user;
	}
	catch (e) {
		// Les paramètres par défaut des utilisateurs.
		const user = {
			premium: false,
			bakbanned: false
		};

		await db.set(key, user);

		return user;
	}
};