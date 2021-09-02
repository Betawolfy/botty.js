const fs = require('fs');
const moment = require('moment')
const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const client = new Discord.Client();
const config = require('./config.json');
const Database = require("@replit/database");
client.commands = new Discord.Collection();


client.on("ready", function() {
  console.log("connexion effectué!");
  client.user.setActivity(`In Development`);
  client.user.setStatus('idle');
})
const db = new Database();

function doMagic8BallVoodoo() {
    var rand = [':8ball: Absolument!', ':8ball: Absolument pas.', ':8ball: cest .', ':8ball: Impossible.', ':8ball: Of course.', ':8ball: I do not think so.', ':8ball: It is true.', ':8ball: It is not true.', ':8ball: I am very undoubtful of that.', ':8ball: I am very doubtful of that.', ':8ball: Sources point to no.', ':8ball: Theories prove it.', ':8ball: Reply hazy try again', ':8ball: Ask again later', ':8ball: Better not tell you now', ':8ball: Cannot predict now', ':8ball: Concentrate and ask again'];

    return rand[Math.floor(Math.random()*rand.length)];
}

client.on("message", function(message) {
  if (message.content === "*test-message") {
    message.channel.send("le bot est bien en ligne");
    console.log("test message reçu! ")
  }
})

client.on("message", function(message) { 
  if (message.content === "*test-log") {
    console.log("test log reçu!")
  }
})

client.on("ready", async () => {
  console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

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

client.on('messageDelete', async message => {
  // Ignore direct messages
  if (!message.guild) return;
  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: 'MESSAGE_DELETE',
  });
  // Since there's only 1 audit log entry in this collection, grab the first one
  const deletionLog = fetchedLogs.entries.first();

  // Perform a coherence check to make sure that there's *something*
  if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

  // Now grab the user object of the person who deleted the message
  // Also grab the target of this action to double-check things
  const { executor, target } = deletionLog;

  // Update the output with a bit more information
  // Also run a check to make sure that the log returned was for the same author's message
  if (target.id === message.author.id) {
    console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
  } else {
    console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
  }
});

client.on('guildMemberRemove', async member => {
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_KICK',
  });
  // Since there's only 1 audit log entry in this collection, grab the first one
  const kickLog = fetchedLogs.entries.first();

  // Perform a coherence check to make sure that there's *something*
  if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

  // Now grab the user object of the person who kicked the member
  // Also grab the target of this action to double-check things
  const { executor, target } = kickLog;

  // Update the output with a bit more information
  // Also run a check to make sure that the log returned was for the same kicked member
  if (target.id === member.id) {
    console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
  } else {
    console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
  }
});

client.on('guildBanAdd', async (guild, user) => {
  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_BAN_ADD',
  });
  // Since there's only 1 audit log entry in this collection, grab the first one
  const banLog = fetchedLogs.entries.first();

  // Perform a coherence check to make sure that there's *something*
  if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

  // Now grab the user object of the person who banned the member
  // Also grab the target of this action to double-check things
  const { executor, target } = banLog;

  // Update the output with a bit more information
  // Also run a check to make sure that the log returned was for the same banned member
  if (target.id === user.id) {
    console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, wielded by the mighty ${executor.tag}`);
  } else {
    console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, audit log fetch was inconclusive.`);
  }
});




require('./server')();
client.login('BahNonEnFait');