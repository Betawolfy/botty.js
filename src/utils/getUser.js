const User = require("../models/User");

const getUser = async (id) => {
	const userInDb = await User.findOne({ id }) || await User.create({ id });
	
	return userInDb;
};

module.exports = getUser;