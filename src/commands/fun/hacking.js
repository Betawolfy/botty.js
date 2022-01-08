/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Commande pour hacker quelqu'un (c'est faux).",
	async execute (message, args) {
		const motDePasse = [
			"7;OJ4(gj*:",
			"?BxKmtBUAE",
			"JNS+6u.0v6",
			"VeryWeakPassword",
			"TekoTheBest",
			"Alpha_x_Maikoa",
		];

		const adresseEmail = [
			"@orange.fr",
			"@gmail.com",
			"@outlook.fr",
			"@tekocoffee.com",
			"@gloomylaunge.org",
		];

		const Token = [
			"X0MZQQggmviXCddXL4T41sqQE",
			"p3C358csEBoqadTTpI9nPFIHT",
			"NCGhJHtpIHuZ0ehdR8QagnfN5",
			"r2fqrzeoa3GIdbwqOGADl0RJv",
			"6ISCFN9P4stE9dKrzUA1tZrtS",
		];

		const ipAdress = Math.floor(Math.random() * 255) + 1;
		const ipAdress2 = Math.floor(Math.random() * 255) + 1;
		const ipAdress3 = Math.floor(Math.random() * 255) + 1;
		const ipAdress4 = Math.floor(Math.random() * 255) + 1;

		//const response = responses[Math.floor(Math.random() * responses.length)];
		const preResponse = `${message.author.username} à hacké `;

		const userMentionInArgs = args.shift();
		if (!userMentionInArgs) {
			return await message.reply({
				content: "Utilisateur introuvable !"
			});
		}

		const userToHack = 
			message.guild.members.cache.find(member => member.user == message.mentions.users.first())
			|| message.guild.members.get(userMentionInArgs);

		const hackEmbed = new Discord.MessageEmbed()
			.setColor("#71d566")
			.setTitle("Hacking v Alpha")
			.setAuthor("Botty Hack", message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				`**₊˚દ pseudo discord : ${userToHack}**\n`
        +"**‧˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚‧**\n"
        +`**╭₊꒷︶ଓ Adresse IP: ${ipAdress}.${ipAdress2}.${ipAdress3}.${ipAdress4}**\n`
        +`**┊ᓚ𖦹 ୨ Token: ${Token}**\n`
        +`**┊₊˚ꕤꕤ Adresse E-mail: ${userToHack} ${adresseEmail}**\n`
        +`**╰ ୨﹕๑‧₊ Mot de passe: ${motDePasse}**\n`
			)
			.setFooter("Le vol d'argent n'est pas encore disponible | toutes informations se révèlant vrai est purement fortuit. ");

		
		await message.channel.send({
			content: `${preResponse} ${hackEmbed}`
		});
	}
};