/** @type {import("../../types/command").CommandFile} */
const ms = require('ms')
const Discord = require("discord.js")
module.exports = {
	commandDescription: "Démarre un jeu de casino.",
	async execute (message, args, logger, log) {
		
    /*  
			'🍍🍍🍍 \n ┊ᓚ<a:A_GirlWoaooh:944638187261820958> ୨ Cadeau: Jackpot! ',
			'🥐🥨🧈 \n ┊ᓚ<a:A_KaguyaNoooo:932263290439094272> ୨ Cadeau: aucun',
			'🌭🌭🍟 \n ┊ᓚ<a:A_TohruOuii:932240925168652288> ୨ Cadeau: tu as gagné x pts de clan ',
			'🍗🥩🍙 \n ┊ᓚ<a:A_KaguyaNoooo:932263290439094272> ୨ Cadeau: tu n\'as rien gagné. ',
      '🍰🎂🧁 \n ┊ᓚ Cake combo ! <a:A_remipleuure:934183097015087205> ୨ Cadeau:!',
			'🍔🌮🍣 \n ┊ᓚ<a:A_KaguyaNoooo:932263290439094272> ୨ Cadeau:',
			'🍟🍔🍦  \n ┊ᓚ Fast-food combo! <a:A_GirlPikaHappy:931900276070318133> ୨ Cadeau:',
			'🐵🐵🐵 \n ┊ᓚ teko\'s hated monkey !! a:A_GirlCrying:932262774334177330 ୨ Cadeau: -550$ ',
      '<B_Coffe2:902202977178238977> <B_Cookie:913878173215776769> <B_Coffee1:902202977559932998> \n ┊ᓚ Cafe combo ! 𖦹 ୨ Cadeau: 100 pts de clan + 4000$',
*/
const responsesV2 = [
    '︰ʚ\🍍ɞ・₊꒷꒦ \n︰ʚ\🍍ɞ・₊꒷꒦ \n︰ʚ\🍍ɞ・₊꒷꒦ \nᓚ<a:A_GirlWoaooh:944638187261820958> ୨ Cadeau: Jackpot!',
    '︰ʚ\🥐ɞ・₊꒷꒦ \n︰ʚ\🥨ɞ・₊꒷꒦ \n︰ʚ\🧈ɞ・₊꒷꒦ \nᓚ<a:A_KaguyaNoooo:932263290439094272> ୨ Cadeau: aucun',
    '︰ʚ\🌭ɞ・₊꒷꒦ \n︰ʚ\🌭ɞ・₊꒷꒦ \n︰ʚ\🍟ɞ・₊꒷꒦ \nᓚ<a:A_TohruOuii:932240925168652288> ୨ Cadeau: tu as gagné x pts de clan ',
    '︰ʚ\🍗ɞ・₊꒷꒦ \n︰ʚ\🥩ɞ・₊꒷꒦ \n︰ʚ\🍙ɞ・₊꒷꒦ \nᓚ<a:A_KaguyaNoooo:932263290439094272> ୨ Cadeau: tu n\'as rien gagné. ',
    '︰ʚ\🍰ɞ・₊꒷꒦ \n︰ʚ\🎂ɞ・₊꒷꒦ \n︰ʚ\🧁ɞ・₊꒷꒦ \nᓚ Cake combo ! <a:A_remipleuure:934183097015087205> ୨ Cadeau:!',
    '︰ʚ\🍔ɞ・₊꒷꒦ \n︰ʚ\🌮ɞ・₊꒷꒦ \n︰ʚ\🍣ɞ・₊꒷꒦ \nᓚ<a:A_KaguyaNoooo:932263290439094272> ୨ Cadeau:',
    '︰ʚ\🍟ɞ・₊꒷꒦ \n︰ʚ\🍔ɞ・₊꒷꒦ \n︰ʚ\🍦ɞ・₊꒷꒦ \nᓚ Fast-food combo! <a:A_GirlPikaHappy:931900276070318133> ୨ Cadeau:',
    '︰ʚ\🐵ɞ・₊꒷꒦ \n︰ʚ\🐵ɞ・₊꒷꒦ \n︰ʚ\🐵ɞ・₊꒷꒦ \n┊ᓚ teko\'s hated monkey !! a:A_GirlCrying:932262774334177330 ୨ Cadeau: -550$ ',
    '︰ʚ\<B_Coffe2:902202977178238977>ɞ・₊꒷꒦ \n︰ʚ\<B_Cookie:913878173215776769>ɞ・₊꒷꒦ \n︰ʚ\<B_Coffee1:902202977559932998>ɞ・₊꒷꒦ \nᓚ Cafe combo ! 𖦹 ୨ Cadeau: 100 pts de clan + 4000$',
];
    
const loading = [
  '**Tirage en cours...**',
  '**Tirage en cours...** \nTips: Wolfy est le meilleur.',
  '**Tirage en cours...** \nTips: Teko est le meilleur.',
  '**Tirage en cours...** \nTips: Mary est la meilleure.',
  '**Tirage en cours...** \nTips: Eve est la meilleure.',
  '**Tirage en cours...** \nTips: Botty est une fille.',
  '**Tirage en cours...** \nTips: Vous voulez être staff? Allez dans le salon Recrutement.',
  '**Tirage en cours...** \nTips: Le 2ème meilleur combo hors jackpot et le "combo coffee". Il rapporte 100 pts de clan et 3500$.',
  '**Tirage en cours...** \nTips: Le meilleur combo hors jackpot est le "combo nitro", uniquement composé d\'emoji venant du serveur, il rapporte 150 pts et 4000$.',
  '**Tirage en cours...** \nTips: Il y a un malus. Du moins, pour le moment. ',
  '**Tirage en cours...** \nTips: All\' Place fait ton bot gratuitement! ',
  ];

    let cooldown = new Set();
    
		const response = responsesV2[Math.floor(Math.random() * responsesV2.length)];
    const loadingRandom = loading[Math.floor(Math.random() * loading.length)];
		const preResponse = 'casino v 0.0.1a';

    const lotoEmbed = new Discord.MessageEmbed()
			.setColor("#71d566")
			.setTitle(preResponse)
			.setAuthor("Teko\'s coffee", message.client.application.iconURL, "https://botty.ga/")
			.setDescription(
				`**╭︰₊˚**Tirage de la machine, voici les lots que tu peux avoir https://docs.google.com/document/d/14f2Nl9DGOzA1GeS6BKmIZCRyHhso-H2szKF2wWd3vwU/edit?usp=sharing ₊˚︶꒦⊹**\n`
        +`︰ ₊˚ *Combinaison :* ₊˚︶꒦⊹\n`
        +`${response} \n`
        +`\n`
        +`╰꒷ଘ\🌸Tu as gagné quelque chose ? Pour le moment, le jeu est en alpha, vous gagnerez des choses lors de la sortie officiel.‧₊˚੭**`
			)
			.setFooter("Version alpha 0.0.1");
/*
    		await message.channel.send({
			content: `${preResponse} ${response}`
		});
*/
    if(cooldown.has(message.author.id)) {
       return message.reply('Tu dois attendre 1 minute !');
        } else {
        await cooldown.add("10000")
        await setTimeout(() => {cooldown.delete(message.author.id)}, 60000);
        }
        let Timer = '0.10m'

            message.channel.send(`${loadingRandom}`).then(msg => {
              setTimeout(function(){
                    msg.edit(message.channel.send({
                     embeds: [lotoEmbed],
			                ephemeral: true
                      
                    }))
                }, 
                         ms(Timer));
            })
console.log("info", ` Loto a bien été joué par <@${message.author.id}>, avec le combo ${response} ! Il à été acceulli par la tip ${loadingRandom}. `);        
	}
};