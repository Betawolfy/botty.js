const winston = require("winston");
const path = require("path");

const partlogger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: path.join(__dirname, "../../logs/partenariat.log")
		})
	],
	format: winston.format.printf((log) => `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${log.message}`)
});

module.exports = partlogger;
