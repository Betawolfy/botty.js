const Discord = require("discord.js");

/** @type {import("../../types/command").CommandFile} */
module.exports = {
	commandDescription: "Commande pour hacker quelqu'un (c'est faux).",
	async execute (message, args) {
		const variMotDePasse = [
			"7;OJ4(gj*:",
			"?BxKmtBUAE",
			"JNS+6u.0v6",
			"VeryWeakPassword",
			"TekoTheBest",
			"Alpha_x_Maikoa",
      "jaimelesfrites",
      "ivAAy7HBYr!4sUr,TbSh",
		];

		const variAdresseEmail = [
			"@orange.fr",
			"@gmail.com",
			"@outlook.fr",
			"@tekocoffee.com",
			"@gloomylaunge.org",
      "@monlycee.net",
		];

		const variToken = [
			"X0MZQQggmviXCddXL4T41sqQE",
			"p3C358csEBoqadTTpI9nPFIHT",
			"NCGhJHtpIHuZ0ehdR8QagnfN5",
			"r2fqrzeoa3GIdbwqOGADl0RJv",
			"6ISCFN9P4stE9dKrzUA1tZrtS",
		];

    const firstName = [
      "Pablo",
      "Jaques-henri",
      "maëlann",
      "Paul",
      "Mélanie",
      "Phillipe",
      "Ahmed",
      "Christophe",
      "Marie",
      "Yahia",
      "Mathis",
      "Mehdi",
      "Mohammed",
      "Louise",
      "The guy",
    ];


    const name = [
      "Amdiaz",
      "Prevert",
      "Ackermann",
      "Bouhours",
      "shalabibi",
      "Blancheton",
      "Form fortnite",
      "mice",
    ];

    const pays =[
      "France",
      "Maroc",
      ":x: - NordVpn utilisé : Canada",
      "Canada",
    ];
    
		const ipAdress = Math.floor(Math.random() * 255) + 1;
		const ipAdress2 = Math.floor(Math.random() * 255) + 1;
		const ipAdress3 = Math.floor(Math.random() * 255) + 1;
		const ipAdress4 = Math.floor(Math.random() * 255) + 1;

		const motDePasse = variMotDePasse[Math.floor(Math.random() * variMotDePasse.length)];
		const adresseEmail = variAdresseEmail[Math.floor(Math.random() * variAdresseEmail.length)];
		const Token = variToken[Math.floor(Math.random() * variToken.length)];
    const firstNameRandom = firstName[Math.floor(Math.random() * firstName.length)];
    const nameRandom = name[Math.floor(Math.random() * name.length)];
    const paysRandom = pays[Math.floor(Math.random() * pays.length)];

    const randomAge = Math.floor((Math.random() * 50) + 1);
    const randomTaille = Math.floor((Math.random() * 99) + 1);
    
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
			.setTitle("Hacking v1")
			.setAuthor("Botty Hack", message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				`**₊˚દ pseudo discord : ${userToHack}**\n`
        +"**‧˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚‧**\n"
        +`**╭₊꒷︶ଓ Adresse IP: ${ipAdress}.${ipAdress2}.${ipAdress3}.${ipAdress4}**\n`
        +`**┊ᓚ𖦹 ୨ Token: ${Token}**\n`
        +`**┊₊˚ꕤꕤ Adresse E-mail: ${userToHack} ${adresseEmail}**\n`
        +`**╰ ୨﹕๑‧₊ Mot de passe: ${motDePasse}**\n`
        +`\n`
        +`**₊˚દ Identité :  **\n`
        +"**‧˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚꒷꒦︶︶₊꒷꒦︶︶₊꒷꒦˚‧**\n"
        +`**╭₊꒷︶ଓ Prénom Nom: ${firstNameRandom} ${nameRandom}**\n`
        +`**┊₊˚ꕤꕤ Age: ${randomAge} **\n`
        +`**┊ᓚ𖦹 ୨ Nationalité: ${paysRandom}**\n`
        +`**╰ ୨﹕๑‧₊ taille : 1, ${randomTaille} m\n**`
			)
			.setFooter("Le vol d'argent n'est pas encore disponible | toutes informations se révèlant vrai est purement fortuit. ");

		
		await message.channel.send({
			embeds: [hackEmbed],
			ephemeral: true
			});
	}
};