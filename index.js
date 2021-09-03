const fs = require('fs');
const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const client = new Discord.Client();
const config = require('./config.json');
const Database = require("@replit/database");
client.commands = new Discord.Collection();
const db = new Database();
const winston = require('winston');
const myConsole = new console.Console(fs.createWriteStream('./msgs.txt'));

//initialisation du système de log
client.logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log' })
  ],
  format: winston.format.printf((log) => `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${log.message}`)
});

client.on('ready', () => client.logger.log('info', 'The bot is online!'));
client.on('debug', m => client.logger.log('debug', m));
client.on('warn', m => client.logger.log('warn', m));
client.on('error', m => client.logger.log('error', m));

process.on('uncaughtException', error => client.logger.log('error', error));

//le bot fera ceci dès son allumage
client.on("ready", function() {
  client.user.setActivity("In Development");
  client.user.setStatus('idle');
});
// le bot indique dans la console sur combien de serveur il est présent 
client.on("ready", async () => {
  console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
});

//ici, on dit que les commendes ce trouvent dans le fichier "commands" et que tout ce qui est en .js est une commande.
const commandFiles = fs.readdirSync('./commands')
.filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
};

// ici, ce sont les réponses de la commandes *8ball
function doMagic8BallVoodoo() {
    var rand = [':8ball: Absolument!', ':8ball: Absolument pas.', ':8ball: cest .', ':8ball: Impossible.', ':8ball: Of course.', ':8ball: I do not think so.', ':8ball: It is true.', ':8ball: It is not true.', ':8ball: I am very undoubtful of that.', ':8ball: I am very doubtful of that.', ':8ball: Sources point to no.', ':8ball: Theories prove it.', ':8ball: Reply hazy try again', ':8ball: Ask again later', ':8ball: Better not tell you now', ':8ball: Cannot predict now', ':8ball: Concentrate and ask again'];

    return rand[Math.floor(Math.random()*rand.length)];
};


//on définit ici le préfixe du bot (ici "*") et le message d'erreur.
client.on('message', message => {
  if (!message.content.startsWith("*") || message.author.bot) return;

  const args = message.content.slice("*".length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('hmmm... cette commende ne fontionne pas comme il faut. l\'équipe technique à été prévenu et va essayer de regler ce problème au plus vite!');
  }
});

//commande help
client.on("message", function(message) {
  if (message.content === "*help") {
    const helpEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('page d\' aide')
      .setURL('https://discord.js.org/')
      .setAuthor('botty.js v0.1-bêta', 'https://github.com/betawolfy/botty-anti-hack-bdscript', '')
      .setDescription('**commande pour le staff:**\n> *help-staff \n**commande pour les outils:**\n> *help-utility \n**commande pour les tickets:**\n> indisponible \n**commande pour le fun:**\n> indisponible \n**aide pour le premium:**\n> indisponible')
      .setThumbnail('')
      .setTimestamp()
      .setFooter('des idées de commandes? https://github.com/betawolfy/botty-anti-hack-bdscript>issue>new issue>feature request', '');

    message.channel.send(helpEmbed);
    console.log("help reçu!");
  }
});

//explication bak-ban
client.on("message", function(message) {
  if (message.content === "*bak-help") {
    const bakhelpEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Information sur le système BAK-BAN')
      .setURL('https://github.com/betawolfy/botty.js/blob/main/BAKBAN.md')
      .setAuthor('botty.js v0.1-bêta', '', '')
      .setDescription('Botty Anti Hack est un nouveau genre de technique de bannissement et d\'anti raid. le principe est que si vous avez été banni pour une cause grave (contenu sexuellement explicite, partage de donnes personnelles, raid), vois serez banni de tout les serveurs sécurisés par botty.')
      .setThumbnail('')
      .setTimestamp()
      .setFooter('vous voulez ajouter le bot sur votre serveur? rendez-vous sur le support.', '');

    message.channel.send(bakhelpEmbed);
    console.log("help reçu!");
  }
});

//ceci est un système de log marchant sur les messages supprimés. on ne peut pas connaitre le message supprimé, mais on sait que quelqu'un à supprimé quelque chose.
client.on('messageDelete', async message => {

  if (!message.guild) return;
  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: 'MESSAGE_DELETE',
  });
  
  const deletionLog = fetchedLogs.entries.first();

  if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

  const { executor, target } = deletionLog;

  if (target.id === message.author.id) {
    console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
  } else {
    console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
  }
});

//ceci est un système de log répertoriant les expulsions. 
client.on('guildMemberRemove', async member => {
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_KICK',
  });

  const kickLog = fetchedLogs.entries.first();

  if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

  const { executor, target } = kickLog;

  if (target.id === member.id) {
    console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
  } else {
    console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
  }
});

//ceci est un système de log répertoriant les bannissements classiques.
client.on('guildBanAdd', async (guild, user) => {
  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_BAN_ADD',
  });
  
  const banLog = fetchedLogs.entries.first();

  if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

  const { executor, target } = banLog;

  if (target.id === user.id) {
    console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, wielded by the mighty ${executor.tag}`);
  } else {
    console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, audit log fetch was inconclusive.`);
  }
});

//système de log général. tout les messages y sont enregistrés et ne sont consultés que dans les cadres d'une enquête consernant un bak ban. 
client.on('message', msg => {
    if(msg.author.bot) return;
    const currentDate = new Date();
    const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
    const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
    myConsole.log(`${currentDate}${guildTag}${channelTag} ${msg.author.tag}: ${msg.content}`);
  });
/* consernant les logs générals et les données stockées par le bot: 
la loi française nous oblige à vous donner le droit de: 
> de demander des informations sur le traitement de vos données à caractère personnel ;
> d’obtenir l’accès aux données à caractère personnel détenues à votre sujet ;
> de demander que les données à caractère personnel incorrectes, inexactes ou incomplètes soient corrigées ;
> de demander que les données à caractère personnel soient effacées lorsqu’elles ne sont plus nécessaires ou si leur traitement est illicite ;
> de vous opposer au traitement de vos données à caractère personnel à des fins de prospection ou pour des raisons liées à votre situation particulière ;
> de demander la limitation du traitement de vos données à caractère personnel dans des cas précis ;
> de récupérer vos données personnelles, dans un format utilisé et lisible par machine, pour un usage personnel ou pour les transférer à un autre organisme ;
> de demander que les décisions fondées sur un traitement automatisé qui vous concernent ou vous affectent de manière significative et fondées sur vos données à caractère personnel soient prises par des personnes physiques et non uniquement par des ordinateurs. Dans ce cas, vous avez également le droit d’exprimer votre avis et de contester lesdites décisions ;
> en cas de dommage matériel ou moral lié à la violation du RGPD, vous disposez d’un droit de recours. Vous pouvez déposer une réclamation auprès de la Commission nationale Informatique et libertés (CNIL) ou introduire une action collective en faisant notamment appel aux associations nationales agréées de défense des consommateurs.
*/
require('./server')();
client.login('BahNonEnFait');
