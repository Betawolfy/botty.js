module.exports = {
	name: 'nickname',
	cooldown: 0,
	aliases: ['nick'],
	description: 'Nicks a user',
	utilisation: '{prefix}nickname',
	category: 'Moderation',
	permissions: ['MANAGE_NICKNAMES'], 
	// in my command handler it will check if the user has all needed permissions to use this command

	async execute (client, message, args){
			if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.reply('Je n\'ai pas la permission de changer les noms d\'utilisateur.'); 
			//checks if bot has all needed permissions

			const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]); 
			//gets the mentioned user
			
			const nickName = ("Hoisted"); 
			//gets the nickname

			if (!args[0]) return message.reply('Vous n\'avez pas mentionné un utilisateur pour que je puisse changer son surnom !'); 
			if (!mentionedMember) return message.reply('Veuillez mentionner un utilisateur pour que je puisse changer son pseudo. \`>nickname @user nickname\`');
			//returns an error message if there isn't a user mentioned or the new nick is not specified

			if (!mentionedMember.kickable) return message.reply('This User Has a senior rank then me i cant change his nickname') 
			//checks if the user that has been mentioned is below the bot in rank of roles, if not the bot won't be able to change the nickname
			
			await mentionedMember.setNickname(nickName).catch(err => console.log(err)) && await message.reply(`l'utilisateur ${mentionedMember} étant inmentionnable facilement, c\' est fait changé son pseudo en ${nickName}`); 
			//changes the nickname to the specified nickname and sends a message Successfuly
	}
}